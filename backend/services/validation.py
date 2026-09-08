"""Jared owns request validation and the future simulator handoff.

Replace the unimplemented result only after the URL model is reviewed.
Input is inspected as text and must never be fetched as a network resource.
"""


def validate_payload(data):
    if not isinstance(data, dict) or not isinstance(data.get('url'), str):
        return {'message': 'Send a JSON object with a string URL.', 'code': 'invalid_request'}, 400
    if not data['url'].strip() or len(data['url']) > 2048:
        return {'message': 'Enter a URL between 1 and 2048 characters.', 'code': 'invalid_request'}, 400
    return {
        'message': 'DFA validation is not implemented yet.',
        'code': 'not_implemented', 'accepted': None, 'trace': [],
    }, 501
