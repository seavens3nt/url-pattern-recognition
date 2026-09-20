import json
from copy import deepcopy
from pathlib import Path

import pytest

from backend.automata import ModelValidationError, simulate_url, validate_dfa_model
from backend.automata.model import load_dfa_model

CASES = json.loads(
    (Path(__file__).parent / 'fixtures' / 'url_cases.json').read_text(encoding='utf-8')
)


@pytest.mark.parametrize('case', CASES, ids=[case['id'] for case in CASES])
def test_approved_language_corpus(case):
    result = simulate_url(case['url'])

    assert result['accepted'] is case['accepted'], case['reason']
    assert len(result['trace']) == len(case['url'])


def test_trace_records_each_transition_for_an_accepted_url():
    value = 'https://example.com/path'
    result = simulate_url(value)

    assert result['accepted'] is True
    assert len(result['trace']) == len(value)
    assert result['trace'][0] == {
        'position': 0,
        'symbol': 'h',
        'from_state': 'M0',
        'to_state': 'M1',
    }


def test_simulation_is_deterministic():
    value = 'https://shop2.example.com/products/item-1/'

    assert simulate_url(value) == simulate_url(value)


def test_rejection_continues_through_the_sink_state_for_a_complete_trace():
    value = 'https://example.com?query'
    result = simulate_url(value)

    assert result['accepted'] is False
    assert result['final_state'] == 'M_sink'
    assert len(result['trace']) == len(value)
    assert result['trace'][19]['symbol'] == '?'
    assert result['trace'][19]['to_state'] == 'M_sink'
    assert result['trace'][-1]['symbol'] == 'y'
    assert result['trace'][-1]['from_state'] == 'M_sink'


def test_unknown_symbols_transition_to_sink():
    result = simulate_url('https://example.com/☃')

    assert result['accepted'] is False
    assert result['final_state'] == 'M_sink'
    assert result['trace'][-1]['symbol'] == '☃'


def test_repeated_internal_hyphens_follow_the_approved_label_grammar():
    accepted = simulate_url('https://xn--fsq.com')
    trailing_hyphen = simulate_url('https://example-.com')

    assert accepted['accepted'] is True
    assert trailing_hyphen['accepted'] is False


def _model_data():
    return json.loads(
        (Path(__file__).parents[1] / 'backend' / 'automata' / 'url_dfa.json').read_text(
            encoding='utf-8'
        )
    )


def test_final_machine_readable_model_loads():
    model = load_dfa_model()

    assert model.start_state == 'M0'
    assert model.sink_state == 'M_sink'
    assert 'M13' in model.accepting_states


def test_final_machine_readable_model_drives_simulation():
    result = simulate_url('https://example.com')

    assert result['accepted'] is True
    assert result['final_state'] == 'M13'


@pytest.mark.parametrize(
    'mutate',
    [
        lambda data: data.pop('states'),
        lambda data: data.update(start_state='MISSING'),
        lambda data: data.update(accepting_states=['MISSING']),
        lambda data: data['transitions']['M0'].update(h='MISSING'),
        lambda data: data['transitions']['M0'].pop('OTHER'),
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
    data = deepcopy(_model_data())
    mutate(data)

    with pytest.raises(ModelValidationError):
        validate_dfa_model(data)


def test_missing_model_file_is_rejected(tmp_path):
    with pytest.raises(ModelValidationError, match='could not be read'):
        load_dfa_model(tmp_path / 'missing.json')


def test_malformed_model_file_is_rejected(tmp_path):
    path = tmp_path / 'dfa.json'
    path.write_text('{', encoding='utf-8')

    with pytest.raises(ModelValidationError, match='malformed'):
        load_dfa_model(path)
