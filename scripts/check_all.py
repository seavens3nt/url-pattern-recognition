"""Run the repository's required backend and frontend checks."""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
PYTEST_BASE = ROOT / ".pytest-tmp"


def run(label: str, command: list[str], cwd: Path = ROOT) -> None:
    """Run one check and stop immediately if it fails."""
    print(f"\n==> {label}", flush=True)
    subprocess.run(command, cwd=cwd, check=True)


def npm_command() -> str:
    executable = "npm.cmd" if os.name == "nt" else "npm"
    resolved = shutil.which(executable)
    if resolved is None:
        raise SystemExit(
            "npm was not found. Install Node.js 22.12 or newer, then reopen the terminal."
        )
    return resolved


def main() -> int:
    npm = npm_command()
    if not (FRONTEND / "node_modules").is_dir():
        raise SystemExit("Frontend packages are missing. Run: cd frontend; npm.cmd ci")

    checks = [
        ("Backend lint", [sys.executable, "-m", "ruff", "check", "backend", "tests", "scripts"], ROOT),
        (
            "Backend tests",
            [sys.executable, "-m", "pytest", f"--basetemp={PYTEST_BASE}"],
            ROOT,
        ),
        ("Frontend lint", [npm, "run", "lint"], FRONTEND),
        ("Frontend tests", [npm, "test"], FRONTEND),
        ("Frontend production build", [npm, "run", "build"], FRONTEND),
    ]

    try:
        for label, command, cwd in checks:
            run(label, command, cwd)
    except subprocess.CalledProcessError as error:
        print(f"\nFAILED: {label} returned exit code {error.returncode}.", file=sys.stderr)
        return error.returncode or 1

    print("\nAll project checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

