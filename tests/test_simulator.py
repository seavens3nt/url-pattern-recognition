import json
from copy import deepcopy
from pathlib import Path

import pytest

from backend.automata import ModelValidationError, simulate_url, validate_dfa_model
from backend.automata.model import BUILTIN_DFA_DATA

CASES = json.loads(
    (Path(__file__).parent / 'fixtures' / 'url_cases.json').read_text(encoding='utf-8')
)


@pytest.mark.parametrize('case', CASES, ids=[case['id'] for case in CASES])
def test_approved_language_corpus(case):
    result = simulate_url(case['url'])

    assert result['accepted'] is case['accepted'], case['reason']
    assert len(result['trace']) <= len(case['url'])


def test_trace_records_each_transition_for_an_accepted_url():
    value = 'https://example.com/path'
    result = simulate_url(value)

    assert result['accepted'] is True
    assert len(result['trace']) == len(value)
    assert result['trace'][0] == {
        'position': 0,
        'symbol': 'h',
        'symbol_class': 'letter',
        'from_state': 'START',
        'to_state': 'H',
    }


def test_simulation_is_deterministic():
    value = 'https://shop2.example.com/products/item-1/'

    assert simulate_url(value) == simulate_url(value)


def test_rejection_stops_when_the_sink_state_is_reached():
    result = simulate_url('https://example.com?query')

    assert result['accepted'] is False
    assert result['final_state'] == 'SINK'
    assert result['trace'][-1]['symbol'] == '?'


def test_unknown_symbols_transition_to_sink():
    result = simulate_url('https://example.com/☃')

    assert result['accepted'] is False
    assert result['final_state'] == 'SINK'
    assert result['trace'][-1]['symbol'] == '☃'
    assert result['trace'][-1]['symbol_class'] == 'other'


def test_repeated_internal_hyphens_follow_the_approved_label_grammar():
    accepted = simulate_url('https://xn--fsq.com')
    trailing_hyphen = simulate_url('https://example-.com')

    assert accepted['accepted'] is True
    assert trailing_hyphen['accepted'] is False


def test_valid_builtin_model_loads():
    model = validate_dfa_model(BUILTIN_DFA_DATA)

    assert model.start_state == 'START'
    assert model.sink_state == 'SINK'
    assert 'TLD_MANY' in model.accepting_states


@pytest.mark.parametrize(
    'mutate',
    [
        lambda data: data.pop('states'),
        lambda data: data.update(start_state='MISSING'),
        lambda data: data.update(accepting_states=['MISSING']),
        lambda data: data['transitions']['START'].update(h='MISSING'),
        lambda data: data['transitions']['START'].pop('other'),
        lambda data: data.update(alphabet=['h', 'h', 'other']),
    ],
    ids=[
        'missing_states',
        'invalid_start',
        'invalid_accepting',
        'invalid_transition_target',
        'incomplete_symbol_row',
        'duplicate_alphabet',
    ],
)
def test_invalid_models_are_rejected(mutate):
    data = deepcopy(BUILTIN_DFA_DATA)
    mutate(data)

    with pytest.raises(ModelValidationError):
        validate_dfa_model(data)
