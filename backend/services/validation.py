"""Request validation and the reviewed DFA simulator handoff."""

from backend.automata import simulate_url


def validate_payload(data):
    if not isinstance(data, dict) or not isinstance(data.get('url'), str):
        return {'message': 'Send a JSON object with a string URL.', 'code': 'invalid_request'}, 400
    if not data['url'].strip() or len(data['url']) > 2048:
        return {'message': 'Enter a URL between 1 and 2048 characters.', 'code': 'invalid_request'}, 400
    return simulate_url(data['url']), 200
