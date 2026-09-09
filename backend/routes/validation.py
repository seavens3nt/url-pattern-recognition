from flask import Blueprint, jsonify, request

from backend.services.validation import validate_payload

api = Blueprint('api', __name__, url_prefix='/api')


@api.get('/health')
def health():
    return jsonify(status='ok', validator_ready=False)


@api.post('/validate')
def validate():
    body, status = validate_payload(request.get_json(silent=True))
    return jsonify(body), status
