from flask import Flask, jsonify, request


def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024

    @app.get('/api/health')
    def health():
        return jsonify(status='ok', validator_ready=False)

    @app.post('/api/validate')
    def validate():
        data = request.get_json(silent=True)
        if not isinstance(data, dict) or not isinstance(data.get('url'), str):
            return jsonify(message='Send a JSON object with a string URL.', code='invalid_request'), 400
        if not data['url'].strip() or len(data['url']) > 2048:
            return jsonify(message='Enter a URL between 1 and 2048 characters.', code='invalid_request'), 400
        return jsonify(message='DFA validation is not implemented yet.', code='not_implemented', accepted=None, trace=[]), 501

    @app.errorhandler(413)
    def too_large(_error):
        return jsonify(message='Request body is too large.', code='invalid_request'), 413

    return app
