"""Deterministic simulator for the approved core URL language.

The transition function is explicit so acceptance comes from DFA state
traversal rather than from a URL parser or regular-expression match.
"""

ACCEPTING_STATES = frozenset({'TLD_MANY', 'PATH_SLASH', 'PATH_SEGMENT'})
SINK = 'SINK'


def _symbol_class(symbol):
    if 'a' <= symbol <= 'z':
        return 'letter'
    if '0' <= symbol <= '9':
        return 'digit'
    if symbol in '-_.~':
        return symbol
    if symbol in ':/':
        return symbol
    return 'other'


def _transition(state, symbol):
    kind = _symbol_class(symbol)
    fixed = {
        ('START', 'h'): 'H',
        ('H', 't'): 'HT',
        ('HT', 't'): 'HTT',
        ('HTT', 'p'): 'HTTP',
        ('HTTP', 's'): 'HTTPS',
        ('HTTP', ':'): 'SCHEME_COLON',
        ('HTTPS', ':'): 'SCHEME_COLON',
        ('SCHEME_COLON', '/'): 'SCHEME_SLASH',
        ('SCHEME_SLASH', '/'): 'HOST_START',
    }
    if (state, symbol) in fixed:
        return fixed[(state, symbol)]

    if state == 'HOST_START':
        return 'FIRST_LABEL_END' if kind in {'letter', 'digit'} else SINK
    if state == 'FIRST_LABEL_END':
        if kind in {'letter', 'digit'}:
            return state
        if symbol == '-':
            return 'FIRST_LABEL_HYPHEN'
        if symbol == '.':
            return 'AFTER_DOT'
        return SINK
    if state == 'FIRST_LABEL_HYPHEN':
        if kind in {'letter', 'digit'}:
            return 'FIRST_LABEL_END'
        return state if symbol == '-' else SINK
    if state == 'AFTER_DOT':
        if kind == 'letter':
            return 'TLD_ONE'
        if kind == 'digit':
            return 'GENERAL_LABEL_END'
        return SINK
    if state == 'TLD_ONE':
        if kind == 'letter':
            return 'TLD_MANY'
        if kind == 'digit':
            return 'GENERAL_LABEL_END'
        if symbol == '-':
            return 'GENERAL_LABEL_HYPHEN'
        if symbol == '.':
            return 'AFTER_DOT'
        return SINK
    if state == 'TLD_MANY':
        if kind == 'letter':
            return state
        if kind == 'digit':
            return 'GENERAL_LABEL_END'
        if symbol == '-':
            return 'GENERAL_LABEL_HYPHEN'
        if symbol == '.':
            return 'AFTER_DOT'
        if symbol == '/':
            return 'PATH_SLASH'
        return SINK
    if state == 'GENERAL_LABEL_END':
        if kind in {'letter', 'digit'}:
            return state
        if symbol == '-':
            return 'GENERAL_LABEL_HYPHEN'
        if symbol == '.':
            return 'AFTER_DOT'
        return SINK
    if state == 'GENERAL_LABEL_HYPHEN':
        if kind in {'letter', 'digit'}:
            return 'GENERAL_LABEL_END'
        return state if symbol == '-' else SINK
    if state == 'PATH_SLASH':
        return 'PATH_SEGMENT' if kind in {'letter', 'digit', '-', '_', '.', '~'} else SINK
    if state == 'PATH_SEGMENT':
        if kind in {'letter', 'digit', '-', '_', '.', '~'}:
            return state
        if symbol == '/':
            return 'PATH_SLASH'
        return SINK
    return SINK


def simulate_url(value):
    """Return the DFA verdict and a transition for every consumed character."""
    state = 'START'
    trace = []
    failure_position = None

    for position, symbol in enumerate(value):
        next_state = _transition(state, symbol)
        trace.append({
            'position': position,
            'symbol': symbol,
            'symbol_class': _symbol_class(symbol),
            'from_state': state,
            'to_state': next_state,
        })
        state = next_state
        if state == SINK:
            failure_position = position
            break

    accepted = state in ACCEPTING_STATES and failure_position is None
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
