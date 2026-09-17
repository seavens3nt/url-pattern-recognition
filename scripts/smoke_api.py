"""Smoke-test a running URL Pattern Recognition API using the shared corpus."""

from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "tests" / "fixtures" / "url_cases.json"
BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:5000").rstrip("/")
TIMEOUT_SECONDS = 5


def request_json(path: str, payload: dict[str, str] | None = None) -> tuple[int, dict]:
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        f"{BASE_URL}{path}",
        data=body,
        headers={"Content-Type": "application/json"} if body is not None else {},
        method="POST" if body is not None else "GET",
    )
    with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
        return response.status, json.load(response)


def wait_for_health() -> None:
    last_error: Exception | None = None
    for _attempt in range(15):
        try:
            status, body = request_json("/api/health")
            if status == 200 and body == {"status": "ok", "validator_ready": True}:
                return
            last_error = RuntimeError(f"Unexpected health response: HTTP {status} {body}")
        except (OSError, urllib.error.URLError, json.JSONDecodeError) as error:
            last_error = error
        time.sleep(1)
    raise RuntimeError(f"API did not become ready at {BASE_URL}: {last_error}")


def validate_case(case: dict) -> None:
    status, body = request_json("/api/validate", {"url": case["url"]})
    required = {"accepted", "message", "final_state", "trace"}
    missing = required.difference(body)
    if status != 200 or missing or body["accepted"] is not case["accepted"]:
        raise AssertionError(
            f"Case {case['id']} failed: HTTP {status}, missing={sorted(missing)}, body={body}"
        )
    if not isinstance(body["trace"], list):
        raise AssertionError(f"Case {case['id']} returned a non-list trace.")


def main() -> None:
    cases = json.loads(FIXTURES.read_text(encoding="utf-8"))
    accepted = next(case for case in cases if case["accepted"] is True)
    rejected = next(case for case in cases if case["accepted"] is False)

    wait_for_health()
    validate_case(accepted)
    validate_case(rejected)
    print(f"API smoke test passed at {BASE_URL} ({accepted['id']}, {rejected['id']}).")


if __name__ == "__main__":
    main()
