import pytest

from backend.app import create_app


@pytest.fixture
def client():
    return create_app().test_client()


def test_health(client):
    assert client.get('/api/health').json == {'status': 'ok', 'validator_ready': False}


@pytest.mark.parametrize('payload', [None, [], {}, {'url': 7}, {'url': ''}, {'url': ' '}, {'url': 'a' * 2049}])
def test_invalid_request(client, payload):
    assert client.post('/api/validate', json=payload).status_code == 400


def test_placeholder_never_claims_acceptance(client):
    result = client.post('/api/validate', json={'url': 'https://example.com'})
    assert result.status_code == 501
    assert result.json['accepted'] is None
    assert result.json['trace'] == []


def test_oversized_request(client):
    assert client.post('/api/validate', json={'url': 'x' * 20000}).status_code == 413
