"""Independent language-level verification of the approved core URL language.

Expected verdicts in this file come from `docs/language-spec.md` and the corpus
contract in `tests/fixtures/README.md`, not from the implementation. The DFA
simulator is only compared against those expectations.

Owner: Paul (QA, issue #41). This package reports defects; it does not fix the
simulator, the API, or the formal models.
"""

import json
from pathlib import Path

import pytest

from backend.automata import simulate_url

REPO_ROOT = Path(__file__).resolve().parents[1]
CASES_PATH = Path(__file__).parent / 'fixtures' / 'url_cases.json'
SPEC_PATH = REPO_ROOT / 'docs' / 'language-spec.md'

REQUIRED_FIELDS = {'id', 'category', 'url', 'accepted', 'source_rule', 'reason'}
VALID_CATEGORIES = {'accepted', 'rejected', 'boundary'}
LANGUAGE_RULE_HEADINGS = {
    'Scheme',
    'Hostname',
    'Top-level label',
    'Subdomains',
    'Port',
    'Path',
    'Query',
    'Fragment',
    'Case',
    'Whitespace',
    'Non-ASCII',
    'IP addresses',
}

# The Phase 1 corpus locked at commit 770b761. Restating every row here means a
# silent change to a shared verdict fails this suite instead of shipping.
LOCKED_CORPUS = {
    'A01': ('http://example.com', True),
    'B01': ('https://example.com/', True),
    'A03': ('https://www.example.com', True),
    'A04': ('https://api.example.com/users', True),
    'A05': ('http://my-site.example.org/docs', True),
    'A06': ('https://v2.api.example.net/users/123', True),
    'A07': ('https://example.co.uk/about-us', True),
    'A08': ('http://docs.example.edu/file_name', True),
    'B02': ('https://shop2.example.com/products/item-1/', True),
    'A10': ('https://a.b.example.com/~user/read.me', True),
    'R01': ('ftp://example.com', False),
    'R02': ('HTTP://example.com', False),
    'R03': ('example.com', False),
    'R04': ('https://localhost', False),
    'B03': ('https://-example.com', False),
    'B04': ('https://example..com', False),
    'R07': ('https://example.com:8080/', False),
    'R08': ('https://example.com/search?q=test', False),
    'R09': ('https://example.com/page#top', False),
    'R10': ('https://192.168.1.1/', False),
}
LOCKED_ACCEPTED = 10
LOCKED_REJECTED = 10

CASES = json.loads(CASES_PATH.read_text(encoding='utf-8'))
CASES_BY_ID = {case['id']: case for case in CASES}
BOUNDARY_CASES = [case for case in CASES if case['category'] == 'boundary']
ROW_IDS = [case['id'] for case in CASES]


def rule_headings(case):
    return [rule.strip() for rule in case['source_rule'].split(';')]


def test_locked_corpus_rows_are_unchanged():
    """The 20 rows accepted in Phase 1 keep their exact URL and verdict."""
    assert set(LOCKED_CORPUS).issubset(CASES_BY_ID), 'a locked corpus row was deleted'

    for case_id, (url, accepted) in LOCKED_CORPUS.items():
        case = CASES_BY_ID[case_id]
        assert case['url'] == url, f'{case_id} URL changed without Ranee scope approval'
        assert case['accepted'] is accepted, f'{case_id} verdict changed without Ranee scope approval'

    locked = [CASES_BY_ID[case_id] for case_id in LOCKED_CORPUS]
    assert sum(case['accepted'] is True for case in locked) == LOCKED_ACCEPTED
    assert sum(case['accepted'] is False for case in locked) == LOCKED_REJECTED
def test_corpus_rows_are_complete_and_unambiguous():
    assert len(CASES) >= len(LOCKED_CORPUS)
    assert len(ROW_IDS) == len(set(ROW_IDS)), 'corpus IDs must be unique'
    assert len({case['url'] for case in CASES}) == len(CASES), 'corpus URLs must be unique'

    for case in CASES:
        assert set(case) == REQUIRED_FIELDS, f'{case["id"]} has unexpected or missing fields'
        assert case['category'] in VALID_CATEGORIES, f'{case["id"]} has an unknown category'
        assert isinstance(case['accepted'], bool), f'{case["id"]} needs an explicit Boolean verdict'
        assert case['reason'].strip(), f'{case["id"]} needs a reason for its verdict'
        assert rule_headings(case), f'{case["id"]} needs a source rule'
        assert all(rule in LANGUAGE_RULE_HEADINGS for rule in rule_headings(case)), (
            f'{case["id"]} cites a rule heading that is not in docs/language-spec.md'
        )
        if case['category'] == 'accepted':
            assert case['accepted'] is True, f'{case["id"]} is an accepted row with a reject verdict'
        if case['category'] == 'rejected':
            assert case['accepted'] is False, f'{case["id"]} is a rejected row with an accept verdict'
        if case['category'] == 'boundary':
            assert case['id'].startswith('B'), 'boundary rows use the B prefix'
        else:
            assert not case['id'].startswith('B'), 'only boundary rows use the B prefix'


def test_corpus_covers_every_approved_rule_heading():
    spec_text = SPEC_PATH.read_text(encoding='utf-8')
    for heading in LANGUAGE_RULE_HEADINGS:
        assert heading in spec_text, f'{heading} is no longer a rule heading in the language spec'

    covered = {rule for case in CASES for rule in rule_headings(case)}
    assert covered == LANGUAGE_RULE_HEADINGS, (
        f'corpus does not exercise: {sorted(LANGUAGE_RULE_HEADINGS - covered)}'
    )


@pytest.mark.parametrize('case', CASES, ids=ROW_IDS)
def test_fixture_cases_are_classified_by_the_simulator(case):
    result = simulate_url(case['url'])

    assert result['accepted'] is case['accepted'], case['reason']
    assert isinstance(result['message'], str) and result['message'].strip()
    assert isinstance(result['final_state'], str) and result['final_state'].strip()
    assert result['trace'], 'every non-empty input produces at least one transition'


@pytest.mark.parametrize('case', BOUNDARY_CASES, ids=[case['id'] for case in BOUNDARY_CASES])
def test_boundary_cases_keep_an_explicit_verdict(case):
    result = simulate_url(case['url'])

    assert result['accepted'] is case['accepted'], case['reason']
    if case['accepted']:
        assert len(result['trace']) == len(case['url']), 'accepted input must be consumed completely'


@pytest.mark.parametrize('case', CASES, ids=ROW_IDS)
def test_trace_positions_follow_the_raw_input_order(case):
    trace = simulate_url(case['url'])['trace']

    assert [step['position'] for step in trace] == list(range(len(trace)))
    assert [step['symbol'] for step in trace] == list(case['url'][:len(trace)]), (
        'the trace must report raw characters exactly as sent, without normalization'
    )


@pytest.mark.parametrize('case', CASES, ids=ROW_IDS)
def test_verdict_is_also_reported_in_the_message(case):
    result = simulate_url(case['url'])

    if case['accepted']:
        assert result['message'] == 'Accepted: the URL matches the approved core language.'
    else:
        assert result['message'].startswith('Rejected:'), 'a rejected verdict needs a readable reason'


__all__ = ['CASES']
