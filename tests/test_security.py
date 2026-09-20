"""Security and request-boundary tests for the Flask validation API.

These tests prove that the service is a text simulator and not a fetcher: no
request payload can reach the network, and malformed transport input never
reaches the DFA path.

Owner: Paul (QA, issue #41). Defects are reported here, not fixed here.
"""

import ast
from contextlib import ExitStack, contextmanager
from pathlib import Path
from unittest import mock

import pytest

from backend.app import create_app

REPO_ROOT = Path(__file__).resolve().parents[1]
BACKEND_ROOT = REPO_ROOT / 'backend'
SERVICE_MODULE = 'backend.services.validation'
MAX_URL_LENGTH = 2048
MAX_BODY_BYTES = 16 * 1024
ACCEPTED_PREFIX = 'https://example.com/'
NETWORK_TARGETS = (
    'socket.create_connection',
    'socket.getaddrinfo',
    'socket.socket.connect',
    'urllib.request.urlopen',
)
FORBIDDEN_IMPORT_ROOTS = {
    'aiohttp',
    'ftplib',
    'http',
    'httpx',
    'requests',
    'smtplib',
    'socket',
    'subprocess',
    'telnetlib',
    'urllib',
    'urllib2',
    'urllib3',
    'webbrowser',
}


@pytest.fixture
def client():
    return create_app().test_client()


@contextmanager
def no_network():
    """Fail the test if any code in the process tries to open a connection."""
    attempts = []

    def forbid(*args, **kwargs):
        attempts.append(args)
        raise AssertionError('the validator attempted network access')

    with ExitStack() as stack:
        for target in NETWORK_TARGETS:
            stack.enter_context(mock.patch(target, forbid))
        yield attempts


def backend_import_roots():
    """Root module names imported anywhere under backend/."""
    roots = set()
    for path in BACKEND_ROOT.rglob('*.py'):
        tree = ast.parse(path.read_text(encoding='utf-8'))
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                roots.update(alias.name.split('.')[0] for alias in node.names)
            elif isinstance(node, ast.ImportFrom) and node.level == 0 and node.module:
                roots.add(node.module.split('.')[0])
    return roots


def padded_url(length):
    """A well-shaped URL padded with an accepted path character."""
    return ACCEPTED_PREFIX + 'a' * (length - len(ACCEPTED_PREFIX))


def post_url(client, url):
    return client.post('/api/validate', json={'url': url})


def forbid_simulator(monkeypatch):
    """Make any call into the DFA path fail the test."""

    def forbid(*args, **kwargs):
        raise AssertionError('the simulator ran for a request that must be rejected upstream')

    monkeypatch.setattr(f'{SERVICE_MODULE}.simulate_url', forbid)


def test_backend_modules_cannot_reach_the_network():
    """A static guard: the validated service must not even link a network client."""
    offending = sorted(backend_import_roots() & FORBIDDEN_IMPORT_ROOTS)

    assert not offending, f'the validation backend imports network-capable modules: {offending}'


@pytest.mark.parametrize(
    ('url', 'accepted'),
    [
        ('https://example.com', True),
        ('http://169.254.169.254/latest/meta-data/', False),
        ('http://127.0.0.1', False),
        ('http://localhost', False),
    ],
)
def test_validation_never_opens_or_connects_to_the_submitted_url(client, url, accepted):
    with no_network() as attempts:
        response = post_url(client, url)

    assert attempts == [], 'validation must not resolve or connect to the submitted URL'
    assert response.status_code == 200
    assert response.json['accepted'] is accepted
    assert response.json['trace'], 'the verdict must come from reading the text only'


@pytest.mark.parametrize(
    'payload',
    [
        None,
        [],
        'text',
        7,
        True,
        {},
        {'url': None},
        {'url': 7},
        {'url': True},
        {'url': 1.5},
        {'url': []},
        {'url': {}},
        {'url': ['https://example.com']},
        {'other': 'https://example.com'},
    ],
)
def test_wrong_types_and_missing_keys_are_transport_errors(monkeypatch, client, payload):
    forbid_simulator(monkeypatch)

    response = client.post('/api/validate', json=payload)

    assert response.status_code == 400
    assert response.json['code'] == 'invalid_request'
    assert isinstance(response.json['message'], str) and response.json['message'].strip()
    assert 'Traceback' not in response.json['message']


@pytest.mark.parametrize('url', ['', ' ', '\t', '\n', '   ', '\u00a0', '\u3000'])
def test_blank_and_whitespace_only_urls_are_transport_errors(monkeypatch, client, url):
    forbid_simulator(monkeypatch)

    response = post_url(client, url)

    assert response.status_code == 400
    assert response.json['code'] == 'invalid_request'


@pytest.mark.parametrize('url', [' https://example.com', 'https://example.com ', 'https://exa mple.com'])
def test_whitespace_inside_a_url_is_a_language_rejection_not_a_transport_error(client, url):
    response = post_url(client, url)

    assert response.status_code == 200
    assert response.json['accepted'] is False


@pytest.mark.parametrize(
    ('url', 'status', 'accepted'),
    [
        pytest.param(padded_url(MAX_URL_LENGTH), 200, True, id='url-at-limit'),
        pytest.param(padded_url(MAX_URL_LENGTH + 1), 400, None, id='url-over-limit'),
        pytest.param('\u00e9' * (MAX_URL_LENGTH + 1), 400, None, id='unicode-url-over-limit'),
        pytest.param('\u00e9' * (MAX_BODY_BYTES // 2 + 100), 413, None, id='unicode-body-over-limit'),
        pytest.param('x' * (MAX_BODY_BYTES + 100), 413, None, id='ascii-body-over-limit'),
    ],
)
def test_url_length_and_body_size_limits(client, url, status, accepted):
    response = post_url(client, url)

    assert response.status_code == status
    if accepted is None:
        assert response.json['code'] == 'invalid_request'
        assert isinstance(response.json['message'], str) and response.json['message'].strip()
    else:
        assert response.json['accepted'] is accepted


@pytest.mark.parametrize(
    'body',
    [
        'not-json',
        '{"url":',
        '{"url": "https://example.com",}',
        '[1, 2, 3]',
        'null',
        '"text"',
        'true',
        '17',
        '',
        '   ',
    ],
)
def test_malformed_json_bodies_never_reach_the_simulator(monkeypatch, client, body):
    forbid_simulator(monkeypatch)

    response = client.post('/api/validate', data=body, content_type='application/json')

    assert response.status_code == 400
    assert response.json['code'] == 'invalid_request'


def test_binary_body_never_reaches_the_simulator(monkeypatch, client):
    forbid_simulator(monkeypatch)

    response = client.post('/api/validate', data=b'\xff\xfe\x00{"url":"https://example.com"}',
                           content_type='application/json')

    assert response.status_code == 400
    assert response.json['code'] == 'invalid_request'


@pytest.mark.parametrize(
    'kwargs',
    [
        {'data': '{"url":"https://example.com"}'},
        {'data': '{"url":"https://example.com"}', 'content_type': 'text/plain'},
        {'data': 'url=https://example.com', 'content_type': 'application/x-www-form-urlencoded'},
    ],
)
def test_non_json_content_types_never_reach_the_simulator(monkeypatch, client, kwargs):
    forbid_simulator(monkeypatch)

    response = client.post('/api/validate', **kwargs)

    assert response.status_code == 400
    assert response.json['code'] == 'invalid_request'


@pytest.mark.parametrize(
    ('url', 'symbol'),
    [
        ('https://example.com?q=1', '?'),
        ('https://example.com#top', '#'),
        ('https://example.com:8080/', ':'),
        ('https://example.com ', ' '),
        ('https://exa_mple.com', '_'),
        ('https://EXAMPLE.com', 'E'),
        ('https://example.com/\u00e9', '\u00e9'),
        ('https://example.com/\U0001f600', '\U0001f600'),
        ('https://example.com/a%20b', '%'),
        ('https://example.com[', '['),
        ('https://example.com|', '|'),
    ],
)
def test_unknown_symbols_are_rejected_at_their_raw_position(client, url, symbol):
    position = url.rindex(symbol) if symbol == ':' else url.index(symbol)

    response = post_url(client, url)

    assert response.status_code == 200
    body = response.json
    assert body['accepted'] is False, f'{symbol!r} must never be accepted'
    trace = {step['position']: step for step in body['trace']}
    assert position in trace, f'the trace must report the raw character at position {position}'
    assert trace[position]['symbol'] == symbol, 'the trace must not normalize the raw input'
    assert trace[position]['to_state'] == body['final_state'], 'rejection must end in the reported state'


def test_internal_simulator_failures_do_not_leak_internals(monkeypatch, client):
    def explode(*args, **kwargs):
        raise RuntimeError('internal sentinel 7f3c')

    monkeypatch.setattr(f'{SERVICE_MODULE}.simulate_url', explode)

    response = post_url(client, 'https://example.com')

    assert response.status_code == 500
    assert b'internal sentinel' not in response.data
    assert b'Traceback' not in response.data
    assert b'backend' not in response.data