"""Deterministic simulator for the approved core URL language."""

from __future__ import annotations

from backend.automata.model import DfaModel, load_dfa_model


def _symbol_class(symbol: str) -> str:
    if 'a' <= symbol <= 'z':
        return 'letter'
    if '0' <= symbol <= '9':
        return 'digit'
    if symbol in '-_.~':
        return symbol
    if symbol in ':/':
        return symbol
    return 'other'


def _transition(model: DfaModel, state: str, symbol: str) -> tuple[str, str]:
    row = model.transitions[state]
    symbol_class = _symbol_class(symbol)
    if symbol in row:
        symbol_key = symbol
    else:
        symbol_key = symbol_class if symbol_class in row else 'other'
    return row[symbol_key], symbol_class


def simulate_url(value: str, model: DfaModel | None = None) -> dict[str, object]:
    """Return the DFA verdict and a transition for every consumed character."""
    dfa = model or load_dfa_model()
    state = dfa.start_state
    trace = []
    failure_position = None

    for position, symbol in enumerate(value):
        next_state, symbol_key = _transition(dfa, state, symbol)
        trace.append({
            'position': position,
            'symbol': symbol,
            'symbol_class': symbol_key,
            'from_state': state,
            'to_state': next_state,
        })
        state = next_state
        if state == dfa.sink_state:
            failure_position = position
            break

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
