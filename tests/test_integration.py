"""Cross-layer agreement tests for the approved core URL language.

Every expected verdict comes from `tests/fixtures/url_cases.json`. The published
regular expression, the DFA simulator, and the Flask API are each compared with
those expectations and with each other, so a disagreement fails the suite
instead of hiding inside one layer.

Owner: Paul (QA, issue #41). Defects are reported here, not fixed here.
"""

import json
import re
import string
from pathlib import Path

import pytest

from backend.app import create_app
from backend.automata import simulate_url

REPO_ROOT = Path(__file__).resolve().parents[1]
FIXTURE_PATH = Path(__file__).parent / 'fixtures' / 'url_cases.json'
EXPRESSION_PATH = REPO_ROOT / 'docs' / 'automata' / 'regular-expression.md'
DFA_PATH = REPO_ROOT / 'backend' / 'automata' / 'url_dfa.json'
NFA_ARTIFACTS = (
    REPO_ROOT / 'docs' / 'automata' / 'nfa.md',
    REPO_ROOT / 'docs' / 'automata' / 'diagrams' / 'nfa.dot',
)

CASES = json.loads(FIXTURE_PATH.read_text(encoding='utf-8'))
ROW_IDS = [case['id'] for case in CASES]
ACCEPTED_IDS = [case['id'] for case in CASES if case['accepted']]
REJECTED_IDS = [case['id'] for case in CASES if not case['accepted']]

DOCUMENTED_RESPONSE_FIELDS = {'accepted', 'message', 'final_state', 'trace'}
DOCUMENTED_TRACE_FIELDS = {'position', 'symbol', 'from_state', 'to_state'}
# symbol_class is returned on the wire but is absent from docs/api-contract.md.
# It is allow-listed so that any *new* undocumented field still fails this
# suite, and so D-002 stays visible until the contract or the response changes.
ADDITIVE_TRACE_FIELDS = {'symbol_class'}
ACCEPTED_MESSAGE = 'Accepted: the URL matches the approved core language.'

REGEX_FENCE = re.compile(r'```regex\r?\n(?P<pattern>.+?)\r?\n```', re.DOTALL)

# Character-class labels published in docs/automata/notation.md section 7.
CHARACTER_CLASSES = {
    'LOWER': set(string.ascii_lowercase),
    'DIGIT': set(string.digits),
    'ALNUM': set(string.ascii_lowercase + string.digits),
    'PATH_CHAR': set(string.ascii_lowercase + string.digits + '._~-'),
}


@pytest.fixture
def client():
    return create_app().test_client()


def first_key(mapping, *keys):
    for key in keys:
        if key in mapping:
            return mapping[key]
    return None


def approved_expression():
    """Compile the implementation-oriented expression published with the RE draft."""
    match = REGEX_FENCE.search(EXPRESSION_PATH.read_text(encoding='utf-8'))
    if match is None:
        pytest.fail(
            'docs/automata/regular-expression.md no longer publishes a fenced ```regex '
            'implementation-oriented expression, so the formal layer cannot be checked.'
        )
    return re.compile(match.group('pattern'))


def assert_documented_response(body):
    """Assert the schema locked in docs/api-contract.md."""
    assert set(body) == DOCUMENTED_RESPONSE_FIELDS, (
        f'unexpected response fields: {sorted(set(body) ^ DOCUMENTED_RESPONSE_FIELDS)}'
    )
    assert isinstance(body['accepted'], bool)
    assert isinstance(body['message'], str) and body['message'].strip()
    assert isinstance(body['final_state'], str) and body['final_state'].strip(), (
        'a completed simulation must return a state label instead of null'
    )
    assert isinstance(body['trace'], list)
    for step in body['trace']:
        missing = DOCUMENTED_TRACE_FIELDS - set(step)
        assert not missing, f'a trace entry is missing {sorted(missing)}'
        extra = set(step) - DOCUMENTED_TRACE_FIELDS
        assert extra <= ADDITIVE_TRACE_FIELDS, f'undocumented extra trace fields: {sorted(extra)}'
        assert isinstance(step['position'], int)
        assert isinstance(step['symbol'], str) and len(step['symbol']) == 1, (
            'each trace entry reports exactly one raw input character'
        )
        assert isinstance(step['from_state'], str) and step['from_state']
        assert isinstance(step['to_state'], str) and step['to_state'], (
            'every completed transition must report a destination state'
        )
def load_dfa_table(path):
    """Read a machine-readable DFA, or return None for an unknown shape.

    Supported shape A (state map):
        {"start": "D0", "accepting": ["D5"], "sink": "D_sink",
         "transitions": {"D0": {"h": "D1"}}}
    Supported shape B (row list):
        {"initial_state": "D0", "accepting_states": ["D5"],
         "transitions": [{"from": "D0", "symbol": "h", "to": "D1"}]}
    """
    data = json.loads(path.read_text(encoding='utf-8'))
    start = first_key(data, 'start', 'start_state', 'initial', 'initial_state')
    accepting = first_key(data, 'accepting', 'accepting_states', 'accept_states', 'final_states', 'accept')
    transitions = first_key(data, 'transitions', 'delta', 'table')
    sink = first_key(data, 'sink', 'sink_state', 'trap', 'trap_state', 'dead_state')

    if not isinstance(start, str) or not isinstance(accepting, (list, tuple, set)):
        return None
    if isinstance(transitions, list):
        table = {}
        for entry in transitions:
            source = symbol = target = None
            if isinstance(entry, dict):
                source = first_key(entry, 'from', 'from_state', 'state', 'source')
                symbol = first_key(entry, 'symbol', 'input', 'label')
                target = first_key(entry, 'to', 'to_state', 'target', 'next')
            if not all(isinstance(item, str) for item in (source, symbol, target)):
                return None
            table.setdefault(source, {})[symbol] = target
    elif isinstance(transitions, dict) and all(isinstance(row, dict) for row in transitions.values()):
        table = {state: dict(row) for state, row in transitions.items()}
        if not all(isinstance(target, str) for row in table.values() for target in row.values()):
            return None
    else:
        return None

    return {
        'start': start,
        'accepting': set(accepting),
        'sink': sink if isinstance(sink, str) else None,
        'table': table,
    }


def run_dfa_table(dfa, value):
    """Run an explicit transition table; a missing transition is a dead end."""
    state = dfa['start']
    for symbol in value:
        row = dfa['table'].get(state, {})
        labels = [symbol]
        if symbol in string.ascii_lowercase and symbol not in {'h', 't', 'p', 's'}:
            labels.append('LOWER')
        elif symbol in string.digits:
            labels.append('DIGIT')
        elif symbol not in {':', '/', '.', '-', '_', '~'}:
            labels.append('OTHER')
        state = next((row[label] for label in labels if label in row), dfa['sink'])
        if state is None:
            return False
    return state in dfa['accepting']


def load_nfa_table(path):
    """Read a machine-readable NFA, or return None for an unknown shape.

    Supported shape:
        {"start": "q0", "accepting": ["q9"], "epsilon_symbol": "eps",
         "transitions": {"q0": {"eps": ["q1"], "LOWER": ["q0"]}}}
    Transition labels may be single characters or the published class names
    from docs/automata/notation.md section 7.
    """
    data = json.loads(path.read_text(encoding='utf-8'))
    start = first_key(data, 'start', 'start_state', 'initial', 'initial_state')
    accepting = first_key(data, 'accepting', 'accepting_states', 'accept_states', 'final_states', 'accept')
    transitions = first_key(data, 'transitions', 'delta', 'table')
    epsilon = data.get('epsilon_symbol', '\u03b5')

    if not isinstance(start, str) or not isinstance(accepting, (list, tuple, set)):
        return None
    if not isinstance(transitions, dict):
        return None

    expanded = {}
    for state, row in transitions.items():
        if not isinstance(row, dict):
            return None
        expanded[state] = {}
        for label, targets in row.items():
            if not isinstance(targets, (list, tuple, set)):
                return None
            members = {label} if label == epsilon else CHARACTER_CLASSES.get(label)
            if members is None and isinstance(label, str) and len(label) == 1:
                members = {label}
            if members is None:
                return None
            for member in members:
                expanded[state].setdefault(member, []).extend(targets)

    return {'start': start, 'accepting': set(accepting), 'epsilon': epsilon, 'table': expanded}


def epsilon_closure(nfa, states):
    closure = set(states)
    pending = list(states)
    while pending:
        for target in nfa['table'].get(pending.pop(), {}).get(nfa['epsilon'], ()):
            if target not in closure:
                closure.add(target)
                pending.append(target)
    return closure


def run_nfa(nfa, value):
    current = epsilon_closure(nfa, {nfa['start']})
    for symbol in value:
        moved = set()
        for state in current:
            moved.update(nfa['table'].get(state, {}).get(symbol, ()))
        current = epsilon_closure(nfa, moved)
    return bool(current & nfa['accepting'])


TOY_DFA_MAP = {
    'start': 'D0',
    'accepting': ['D1'],
    'transitions': {'D0': {'a': 'D1'}, 'D1': {'a': 'D1'}},
}
TOY_DFA_ROWS = {
    'initial_state': 'D0',
    'accepting_states': ['D1'],
    'transitions': [
        {'from': 'D0', 'symbol': 'a', 'to': 'D1'},
        {'from_state': 'D1', 'symbol': 'a', 'to_state': 'D1'},
    ],
}
TOY_NFA = {
    'start': 'q0',
    'accepting': ['q1'],
    'epsilon_symbol': 'eps',
    'transitions': {'q0': {'eps': ['q1'], 'LOWER': ['q0']}},
}


def write_json(path, payload):
    path.write_text(json.dumps(payload), encoding='utf-8')
    return path


def test_dfa_loader_supports_the_state_map_shape(tmp_path):
    dfa = load_dfa_table(write_json(tmp_path / 'dfa.json', TOY_DFA_MAP))

    assert dfa is not None
    assert run_dfa_table(dfa, 'aaa') is True
    assert run_dfa_table(dfa, '') is False
    assert run_dfa_table(dfa, 'b') is False


def test_dfa_loader_supports_the_row_list_shape(tmp_path):
    dfa = load_dfa_table(write_json(tmp_path / 'dfa.json', TOY_DFA_ROWS))

    assert dfa is not None
    assert run_dfa_table(dfa, 'aa') is True
    assert run_dfa_table(dfa, 'b') is False


def test_dfa_loader_refuses_an_unsupported_shape(tmp_path):
    assert load_dfa_table(write_json(tmp_path / 'dfa.json', {'states': ['D0']})) is None


def test_nfa_loader_understands_epsilon_and_class_labels(tmp_path):
    nfa = load_nfa_table(write_json(tmp_path / 'nfa.json', TOY_NFA))

    assert nfa is not None
    assert run_nfa(nfa, '') is True
    assert run_nfa(nfa, 'abc') is True
    assert run_nfa(nfa, 'A') is False


@pytest.mark.parametrize('case', CASES, ids=ROW_IDS)
def test_api_response_matches_the_locked_schema(client, case):
    response = client.post('/api/validate', json={'url': case['url']})

    assert response.status_code == 200
    body = response.json
    assert_documented_response(body)
    assert body['accepted'] is case['accepted'], case['reason']
    if case['accepted']:
        assert body['message'] == ACCEPTED_MESSAGE
    else:
        assert body['message'].startswith('Rejected:'), 'a rejected verdict needs a readable reason'


@pytest.mark.parametrize('case', [case for case in CASES if case['accepted']], ids=ACCEPTED_IDS)
def test_accepted_traces_cover_the_full_raw_input(client, case):
    body = client.post('/api/validate', json={'url': case['url']}).json

    assert [step['position'] for step in body['trace']] == list(range(len(case['url'])))
    assert body['trace'][-1]['to_state'] == body['final_state']


@pytest.mark.parametrize('case', [case for case in CASES if not case['accepted']], ids=REJECTED_IDS)
def test_rejected_traces_stop_in_the_reported_final_state(client, case):
    body = client.post('/api/validate', json={'url': case['url']}).json

    assert body['accepted'] is False
    assert body['trace'][-1]['to_state'] == body['final_state']


@pytest.mark.parametrize('case', CASES, ids=ROW_IDS)
def test_published_expression_agrees_with_the_fixture_and_the_simulator(case):
    expression_accepts = approved_expression().fullmatch(case['url']) is not None

    assert expression_accepts is case['accepted'], (
        f'{case["id"]}: docs/automata/regular-expression.md disagrees with the fixture verdict'
    )
    assert simulate_url(case['url'])['accepted'] is case['accepted'], case['reason']


def test_published_expression_still_carries_the_locked_constraints():
    pattern = REGEX_FENCE.search(EXPRESSION_PATH.read_text(encoding='utf-8')).group('pattern')

    assert pattern.startswith('^(?:http|https)://'), 'the expression must anchor the approved schemes'
    assert pattern.endswith('$'), 'the expression must be a full-input match'
    assert '[a-z]{2,}' in pattern, 'the expression must require two or more lowercase TLD letters'


def test_consecutive_interior_hyphens_are_resolved_consistently():
    value = 'https://my--site.example.com'

    assert approved_expression().fullmatch(value) is not None, 'the published expression accepts it'
    assert simulate_url(value)['accepted'] is True, 'the simulator must agree with the approved grammar'


@pytest.mark.parametrize(
    'url',
    [
        'https://example.com?query',
        'https://example.com#top',
        'https://example.com/a b',
        'https://example.com:8080/',
    ],
)
@pytest.mark.xfail(
    strict=True,
    reason='D-001: docs/api-contract.md requires one trace entry per raw input character, including '
           'after the trap state, but the simulator stops at the first sink transition. Remove this '
           'marker after Jared confirms the completed-trace fix and S-002 is re-reviewed.',
)
def test_rejected_traces_cover_the_full_raw_input(client, url):
    body = client.post('/api/validate', json={'url': url}).json

    assert body['accepted'] is False
    assert [step['position'] for step in body['trace']] == list(range(len(url)))


def test_formal_model_artifacts_are_published():
    expected = [DFA_PATH, *NFA_ARTIFACTS]
    missing = [path.relative_to(REPO_ROOT) for path in expected if not path.exists()]

    assert not missing, f'formal model artifacts required by Issue #36 are missing: {missing}'


@pytest.mark.parametrize('case', CASES, ids=ROW_IDS)
def test_fixture_simulator_and_api_verdicts_agree(client, case):
    simulated = simulate_url(case['url'])
    body = client.post('/api/validate', json={'url': case['url']}).json

    assert simulated['accepted'] is case['accepted'], case['reason']
    assert body['accepted'] is simulated['accepted'], 'the API disagrees with the simulator'
    assert body['final_state'] == simulated['final_state']
    assert body['trace'] == simulated['trace'], 'the API must not rewrite the simulator trace'
    assert body['message'] == simulated['message']