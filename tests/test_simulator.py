import json
from pathlib import Path

import pytest

from backend.automata import simulate_url

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


def test_rejection_stops_when_the_sink_state_is_reached():
    result = simulate_url('https://example.com?query')

    assert result['accepted'] is False
    assert result['final_state'] == 'SINK'
    assert result['trace'][-1]['symbol'] == '?'
