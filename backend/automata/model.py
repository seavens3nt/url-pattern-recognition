"""Validated loading for the reviewed machine-readable DFA."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from types import MappingProxyType
from typing import Any

MODEL_PATH = Path(__file__).with_name("url_dfa.json")


class ModelValidationError(ValueError):
    """Raised when a DFA model is unavailable, malformed, or inconsistent."""


@dataclass(frozen=True)
class DfaModel:
    states: frozenset[str]
    alphabet: tuple[str, ...]
    start_state: str
    accepting_states: frozenset[str]
    sink_state: str
    transitions: MappingProxyType[str, MappingProxyType[str, str]]


def validate_dfa_model(data: object) -> DfaModel:
    if not isinstance(data, dict):
        raise ModelValidationError("DFA model must be a JSON object.")

    required = {"states", "alphabet", "start_state", "accepting_states", "sink_state", "transitions"}
    optional = {"name", "symbol_partition", "provenance"}
    if not required <= set(data) or set(data) - required - optional:
        raise ModelValidationError("DFA model has missing or unexpected top-level fields.")

    states = _validate_string_set(data["states"], "states", allow_empty=False)
    alphabet = _validate_alphabet(data["alphabet"])
    start_state = _validate_state_name(data["start_state"], "start_state")
    accepting_states = _validate_string_set(data["accepting_states"], "accepting_states", allow_empty=True)
    sink_state = _validate_state_name(data["sink_state"], "sink_state")
    _validate_metadata(data, alphabet)

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
        alphabet=alphabet,
        start_state=start_state,
        accepting_states=frozenset(accepting_states),
        sink_state=sink_state,
        transitions=MappingProxyType(
            {state: MappingProxyType(row) for state, row in transitions.items()}
        ),
    )


def load_dfa_model(path: Path = MODEL_PATH) -> DfaModel:
    try:
        raw_model = path.read_text(encoding="utf-8")
    except OSError as error:
        raise ModelValidationError("DFA model file could not be read.") from error

    try:
        data = json.loads(raw_model)
    except json.JSONDecodeError as error:
        raise ModelValidationError("DFA model JSON is malformed.") from error
    return validate_dfa_model(data)


def _validate_state_name(value: object, field: str) -> str:
    if not isinstance(value, str) or not value:
        raise ModelValidationError(f"{field} entries must be non-empty strings.")
    return value


def _validate_string_set(value: object, field: str, *, allow_empty: bool) -> set[str]:
    if not isinstance(value, list):
        raise ModelValidationError(f"{field} must be a list.")
    if not allow_empty and not value:
        raise ModelValidationError(f"{field} cannot be empty.")
    result = {_validate_state_name(item, field) for item in value}
    if len(result) != len(value):
        raise ModelValidationError(f"{field} cannot contain duplicates.")
    return result


def _validate_alphabet(value: object) -> tuple[str, ...]:
    if not isinstance(value, list) or not value:
        raise ModelValidationError("alphabet must be a non-empty list.")
    symbols = tuple(_validate_state_name(item, "alphabet") for item in value)
    if len(set(symbols)) != len(symbols):
        raise ModelValidationError("alphabet cannot contain duplicate symbols.")
    if "other" not in symbols and "OTHER" not in symbols:
        raise ModelValidationError("alphabet must include OTHER (or other) for unknown input.")
    return symbols


def _validate_metadata(data: dict[str, Any], alphabet: tuple[str, ...]) -> None:
    name = data.get("name")
    if name is not None and (not isinstance(name, str) or not name):
        raise ModelValidationError("name must be a non-empty string when provided.")

    partition = data.get("symbol_partition")
    if partition is not None:
        if not isinstance(partition, dict) or set(partition) != set(alphabet):
            raise ModelValidationError("symbol_partition must describe every alphabet symbol exactly once.")
        if not all(isinstance(value, str) and value for value in partition.values()):
            raise ModelValidationError("symbol_partition descriptions must be non-empty strings.")

    provenance = data.get("provenance")
    if provenance is not None:
        if not isinstance(provenance, dict) or not provenance:
            raise ModelValidationError("provenance must be a non-empty object when provided.")
        if not all(
            isinstance(key, str) and key and isinstance(value, str) and value
            for key, value in provenance.items()
        ):
            raise ModelValidationError("provenance keys and values must be non-empty strings.")


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
