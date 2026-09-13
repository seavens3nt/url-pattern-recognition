import json
from pathlib import Path

CASES_PATH = Path(__file__).parent / 'fixtures' / 'url_cases.json'


def test_shared_language_corpus_is_complete_and_unambiguous():
    cases = json.loads(CASES_PATH.read_text(encoding='utf-8'))

    accepted = [case for case in cases if case['accepted'] is True]
    rejected = [case for case in cases if case['accepted'] is False]

    assert len(accepted) == 10
    assert len(rejected) == 10
    assert len({case['id'] for case in cases}) == 20
    assert len({case['url'] for case in cases}) == 20
    assert all(case['reason'].strip() for case in cases)
