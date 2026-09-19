import json
from pathlib import Path

import pytest

from backend.app import create_app

CASES = json.loads(
    (Path(__file__).parent / 'fixtures' / 'url_cases.json').read_text(encoding='utf-8')
)


@pytest.fixture
def client():
    return create_app().test_client()


def test_health(client):
    assert client.get('/api/health').json == {'status': 'ok', 'validator_ready': True}


@pytest.mark.parametrize('payload', [None, [], {}, {'url': 7}, {'url': ''}, {'url': ' '}, {'url': 'a' * 2049}])
def test_invalid_request(client, payload):
    assert client.post('/api/validate', json=payload).status_code == 400


def test_malformed_json_is_an_invalid_request(client):
    result = client.post('/api/validate', data='{"url":', content_type='application/json')

    assert result.status_code == 400
    assert result.json == {'code': 'invalid_request', 'message': 'Send a valid JSON request body.'}


def test_invalid_content_type_is_an_invalid_request(client):
    result = client.post('/api/validate', data='url=https://example.com', content_type='text/plain')

    assert result.status_code == 400
    assert result.json == {
        'code': 'invalid_request',
        'message': 'Send requests with Content-Type: application/json.',
    }


@pytest.mark.parametrize(
    ('url', 'accepted'),
    [('https://example.com', True), ('https://example.com:8080', False)],
)
def test_validation_returns_a_dfa_verdict_and_trace(client, url, accepted):
    result = client.post('/api/validate', json={'url': url})

    assert result.status_code == 200
    assert result.json['accepted'] is accepted
    assert isinstance(result.json['final_state'], str)
    assert result.json['trace']
    assert set(result.json) == {'accepted', 'message', 'final_state', 'trace'}


@pytest.mark.parametrize('case', CASES, ids=[case['id'] for case in CASES])
def test_shared_fixture_cases_return_http_200_dfa_verdicts(client, case):
    result = client.post('/api/validate', json={'url': case['url']})

    assert result.status_code == 200
    assert result.json['accepted'] is case['accepted'], case['reason']
    assert set(result.json) == {'accepted', 'message', 'final_state', 'trace'}


def test_oversized_request(client):
    assert client.post('/api/validate', json={'url': 'x' * 20000}).status_code == 413
