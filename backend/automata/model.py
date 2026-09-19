"""Validated DFA model loading for the approved core URL language."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from types import MappingProxyType
from typing import Any

MODEL_PATH = Path(__file__).with_name("url_dfa.json")
STATE_START = "START"
STATE_SINK = "SINK"

ALPHABET = (
    "h",
    "t",
    "p",
    "s",
    ":",
    "/",
    ".",
    "-",
    "_",
    "~",
    "letter",
    "digit",
    "other",
)

STATES = (
    STATE_START,
    "H",
    "HT",
    "HTT",
    "HTTP",
    "HTTPS",
    "SCHEME_COLON",
    "SCHEME_SLASH",
    "HOST_START",
    "FIRST_LABEL_END",
    "FIRST_LABEL_HYPHEN",
    "AFTER_DOT",
    "TLD_ONE",
    "TLD_MANY",
    "GENERAL_LABEL_END",
    "GENERAL_LABEL_HYPHEN",
    "PATH_SLASH",
    "PATH_SEGMENT",
    STATE_SINK,
)

ACCEPTING_STATES = ("TLD_MANY", "PATH_SLASH", "PATH_SEGMENT")


class ModelValidationError(ValueError):
    """Raised when a DFA model is malformed or internally inconsistent."""


@dataclass(frozen=True)
class DfaModel:
    states: frozenset[str]
    alphabet: tuple[str, ...]
    start_state: str
    accepting_states: frozenset[str]
    sink_state: str
    transitions: MappingProxyType[str, MappingProxyType[str, str]]


def _state_row(default: str = STATE_SINK, **overrides: str) -> dict[str, str]:
    row = {symbol: default for symbol in ALPHABET}
    row.update(overrides)
    return row


BUILTIN_DFA_DATA: dict[str, Any] = {
    "states": list(STATES),
    "alphabet": list(ALPHABET),
    "start_state": STATE_START,
    "accepting_states": list(ACCEPTING_STATES),
    "sink_state": STATE_SINK,
    "transitions": {
        STATE_START: _state_row(h="H"),
        "H": _state_row(t="HT"),
        "HT": _state_row(t="HTT"),
        "HTT": _state_row(p="HTTP"),
        "HTTP": _state_row(s="HTTPS", **{":": "SCHEME_COLON"}),
        "HTTPS": _state_row(**{":": "SCHEME_COLON"}),
        "SCHEME_COLON": _state_row(**{"/": "SCHEME_SLASH"}),
        "SCHEME_SLASH": _state_row(**{"/": "HOST_START"}),
        "HOST_START": _state_row(
            h="FIRST_LABEL_END",
            t="FIRST_LABEL_END",
            p="FIRST_LABEL_END",
            s="FIRST_LABEL_END",
            letter="FIRST_LABEL_END",
            digit="FIRST_LABEL_END",
        ),
        "FIRST_LABEL_END": _state_row(
            h="FIRST_LABEL_END",
            t="FIRST_LABEL_END",
            p="FIRST_LABEL_END",
            s="FIRST_LABEL_END",
            letter="FIRST_LABEL_END",
            digit="FIRST_LABEL_END",
            **{"-": "FIRST_LABEL_HYPHEN", ".": "AFTER_DOT"},
        ),
        "FIRST_LABEL_HYPHEN": _state_row(
            h="FIRST_LABEL_END",
            t="FIRST_LABEL_END",
            p="FIRST_LABEL_END",
            s="FIRST_LABEL_END",
            letter="FIRST_LABEL_END",
            digit="FIRST_LABEL_END",
            **{"-": "FIRST_LABEL_HYPHEN"},
        ),
        "AFTER_DOT": _state_row(
            h="TLD_ONE",
            t="TLD_ONE",
            p="TLD_ONE",
            s="TLD_ONE",
            letter="TLD_ONE",
            digit="GENERAL_LABEL_END",
        ),
        "TLD_ONE": _state_row(
            h="TLD_MANY",
            t="TLD_MANY",
            p="TLD_MANY",
            s="TLD_MANY",
            letter="TLD_MANY",
            digit="GENERAL_LABEL_END",
            **{"-": "GENERAL_LABEL_HYPHEN", ".": "AFTER_DOT"},
        ),
        "TLD_MANY": _state_row(
            h="TLD_MANY",
            t="TLD_MANY",
            p="TLD_MANY",
            s="TLD_MANY",
            letter="TLD_MANY",
            digit="GENERAL_LABEL_END",
            **{"-": "GENERAL_LABEL_HYPHEN", ".": "AFTER_DOT", "/": "PATH_SLASH"},
        ),
        "GENERAL_LABEL_END": _state_row(
            h="GENERAL_LABEL_END",
            t="GENERAL_LABEL_END",
            p="GENERAL_LABEL_END",
            s="GENERAL_LABEL_END",
            letter="GENERAL_LABEL_END",
            digit="GENERAL_LABEL_END",
            **{"-": "GENERAL_LABEL_HYPHEN", ".": "AFTER_DOT"},
        ),
        "GENERAL_LABEL_HYPHEN": _state_row(
            h="GENERAL_LABEL_END",
            t="GENERAL_LABEL_END",
            p="GENERAL_LABEL_END",
            s="GENERAL_LABEL_END",
            letter="GENERAL_LABEL_END",
            digit="GENERAL_LABEL_END",
            **{"-": "GENERAL_LABEL_HYPHEN"},
        ),
        "PATH_SLASH": _state_row(
            h="PATH_SEGMENT",
            t="PATH_SEGMENT",
            p="PATH_SEGMENT",
            s="PATH_SEGMENT",
            letter="PATH_SEGMENT",
            digit="PATH_SEGMENT",
            **{"-": "PATH_SEGMENT", "_": "PATH_SEGMENT", ".": "PATH_SEGMENT", "~": "PATH_SEGMENT"},
        ),
        "PATH_SEGMENT": _state_row(
            h="PATH_SEGMENT",
            t="PATH_SEGMENT",
            p="PATH_SEGMENT",
            s="PATH_SEGMENT",
            letter="PATH_SEGMENT",
            digit="PATH_SEGMENT",
            **{
                "-": "PATH_SEGMENT",
                "_": "PATH_SEGMENT",
                ".": "PATH_SEGMENT",
                "~": "PATH_SEGMENT",
                "/": "PATH_SLASH",
            },
        ),
        STATE_SINK: _state_row(),
    },
}


def validate_dfa_model(data: object) -> DfaModel:
    if not isinstance(data, dict):
        raise ModelValidationError("DFA model must be a JSON object.")

    required = {"states", "alphabet", "start_state", "accepting_states", "sink_state", "transitions"}
    if set(data) != required:
        raise ModelValidationError("DFA model has missing or unexpected top-level fields.")

    states = _validate_string_set(data["states"], "states", allow_empty=False)
    alphabet = _validate_alphabet(data["alphabet"])
    start_state = _validate_state_name(data["start_state"], "start_state")
    accepting_states = _validate_string_set(data["accepting_states"], "accepting_states", allow_empty=True)
    sink_state = _validate_state_name(data["sink_state"], "sink_state")

    if start_state not in states:
        raise ModelValidationError("start_state must reference a declared state.")
    if sink_state not in states:
        raise ModelValidationError("sink_state must reference a declared state.")
    if not accepting_states <= states:
        raise ModelValidationError("accepting_states must reference only declared states.")
    if sink_state in accepting_states:
        raise ModelValidationError("sink_state cannot be accepting.")

    transitions = _validate_transitions(data["transitions"], states, alphabet)
    return DfaModel(
        states=frozenset(states),
        alphabet=tuple(alphabet),
        start_state=start_state,
        accepting_states=frozenset(accepting_states),
        sink_state=sink_state,
        transitions=MappingProxyType({
            state: MappingProxyType(row)
            for state, row in transitions.items()
        }),
    )


def load_dfa_model(path: Path = MODEL_PATH) -> DfaModel:
    if path.exists():
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            raise ModelValidationError("DFA model JSON is malformed.") from error
        return validate_dfa_model(data)
    return validate_dfa_model(BUILTIN_DFA_DATA)


def _validate_state_name(value: object, field: str) -> str:
    if not isinstance(value, str) or not value:
        raise ModelValidationError(f"{field} entries must be non-empty strings.")
    return value


def _validate_string_set(value: object, field: str, *, allow_empty: bool) -> set[str]:
    if not isinstance(value, list):
        raise ModelValidationError(f"{field} must be a list.")
    if not allow_empty and not value:
        raise ModelValidationError(f"{field} cannot be empty.")
    result = set()
    for item in value:
        result.add(_validate_state_name(item, field))
    if len(result) != len(value):
        raise ModelValidationError(f"{field} cannot contain duplicates.")
    return result


def _validate_alphabet(value: object) -> tuple[str, ...]:
    if not isinstance(value, list) or not value:
        raise ModelValidationError("alphabet must be a non-empty list.")
    symbols = []
    for item in value:
        if not isinstance(item, str) or not item:
            raise ModelValidationError("alphabet entries must be non-empty strings.")
        symbols.append(item)
    if len(set(symbols)) != len(symbols):
        raise ModelValidationError("alphabet cannot contain duplicate symbols.")
    if "other" not in symbols:
        raise ModelValidationError("alphabet must include an other symbol for unknown input.")
    return tuple(symbols)


def _validate_transitions(
    value: object,
    states: set[str],
    alphabet: tuple[str, ...],
) -> dict[str, dict[str, str]]:
    if not isinstance(value, dict):
        raise ModelValidationError("transitions must be an object.")
    if set(value) != states:
        raise ModelValidationError("transitions must contain exactly one row for each state.")

    alphabet_set = set(alphabet)
    rows = {}
    for state, row in value.items():
        if not isinstance(row, dict):
            raise ModelValidationError("each transition row must be an object.")
        if set(row) != alphabet_set:
            raise ModelValidationError("each transition row must define every alphabet symbol exactly once.")
        checked_row = {}
        for symbol, target in row.items():
            if not isinstance(symbol, str) or not isinstance(target, str):
                raise ModelValidationError("transition symbols and targets must be strings.")
            if target not in states:
                raise ModelValidationError("transition targets must reference declared states.")
            checked_row[symbol] = target
        rows[state] = checked_row
    return rows
