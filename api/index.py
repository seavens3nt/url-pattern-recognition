"""Vercel's WSGI entry point for the reviewed Flask API."""

from backend.app import create_app

app = create_app()
