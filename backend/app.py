from flask import Flask, jsonify

from backend.routes.validation import api


def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024
    app.register_blueprint(api)

    @app.errorhandler(413)
    def too_large(_error):
        return jsonify(message='Request body is too large.', code='invalid_request'), 413

    return app
