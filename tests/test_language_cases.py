import json
from pathlib import Path

CASES_PATH = Path(__file__).parent / 'fixtures' / 'url_cases.json'

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


def test_shared_language_corpus_is_complete_and_unambiguous():
    cases = json.loads(CASES_PATH.read_text(encoding='utf-8'))

    accepted = [case for case in cases if case['accepted'] is True]
    rejected = [case for case in cases if case['accepted'] is False]

    assert len(accepted) == 10
    assert len(rejected) == 10
    assert len({case['id'] for case in cases}) == 20
    assert len({case['url'] for case in cases}) == 20
    assert all(set(case) == REQUIRED_FIELDS for case in cases)
    assert all(case['category'] in VALID_CATEGORIES for case in cases)
    assert all(
        (case['category'] != 'accepted' or case['accepted'] is True)
        and (case['category'] != 'rejected' or case['accepted'] is False)
        for case in cases
    )
    assert all(
        case['source_rule'].strip()
        and all(
            rule.strip() in LANGUAGE_RULE_HEADINGS
            for rule in case['source_rule'].split(';')
        )
        for case in cases
    )
    assert all(case['reason'].strip() for case in cases)
