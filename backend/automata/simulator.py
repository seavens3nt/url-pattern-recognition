"""Deterministic simulator for the approved core URL language."""

from __future__ import annotations

from backend.automata.model import DfaModel, load_dfa_model


def _symbol_key(model: DfaModel, symbol: str) -> str:
    if symbol in model.alphabet:
        return symbol
    if 'a' <= symbol <= 'z':
        for candidate in ('LOWER', 'letter'):
            if candidate in model.alphabet:
                return candidate
    if '0' <= symbol <= '9':
        for candidate in ('DIGIT', 'digit'):
            if candidate in model.alphabet:
                return candidate
    return 'OTHER' if 'OTHER' in model.alphabet else 'other'


def _transition(model: DfaModel, state: str, symbol: str) -> str:
    row = model.transitions[state]
    return row[_symbol_key(model, symbol)]


def simulate_url(value: str, model: DfaModel | None = None) -> dict[str, object]:
    """Return the DFA verdict and a transition for every consumed character."""
    dfa = model or load_dfa_model()
    state = dfa.start_state
    trace = []
    failure_position = None

    for position, symbol in enumerate(value):
        next_state = _transition(dfa, state, symbol)
        trace.append({
            'position': position,
            'symbol': symbol,
            'from_state': state,
            'to_state': next_state,
        })
        state = next_state
        if state == dfa.sink_state and failure_position is None:
            failure_position = position

    accepted = state in dfa.accepting_states and failure_position is None
    if accepted:
        message = 'Accepted: the URL matches the approved core language.'
    elif failure_position is not None:
        message = f'Rejected: the DFA entered its sink state at character {failure_position}.'
    else:
        message = f'Rejected: the input ended in non-accepting state {state}.'

    return {
        'accepted': accepted,
        'message': message,
        'final_state': state,
        'trace': trace,
    }
