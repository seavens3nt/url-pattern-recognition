import pytest

from backend.app import create_app


@pytest.fixture
def client():
    return create_app().test_client()


def test_health(client):
    assert client.get('/api/health').json == {'status': 'ok', 'validator_ready': True}


@pytest.mark.parametrize('payload', [None, [], {}, {'url': 7}, {'url': ''}, {'url': ' '}, {'url': 'a' * 2049}])
def test_invalid_request(client, payload):
    assert client.post('/api/validate', json=payload).status_code == 400


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


def test_oversized_request(client):
    assert client.post('/api/validate', json={'url': 'x' * 20000}).status_code == 413
