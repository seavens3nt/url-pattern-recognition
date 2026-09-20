from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequest

from backend.services.validation import validate_payload

api = Blueprint('api', __name__, url_prefix='/api')


@api.get('/health')
def health():
    return jsonify(status='ok', validator_ready=True)


@api.post('/validate')
def validate():
    if not request.is_json:
        body = {'message': 'Send requests with Content-Type: application/json.', 'code': 'invalid_request'}
        return jsonify(body), 400
    try:
        data = request.get_json(silent=False)
    except BadRequest:
        body = {'message': 'Send a valid JSON request body.', 'code': 'invalid_request'}
        return jsonify(body), 400
    body, status = validate_payload(data)
    return jsonify(body), status
