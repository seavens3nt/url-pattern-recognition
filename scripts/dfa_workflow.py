"""DFA extraction and minimization workflow.

This script extracts the DFA implemented in `backend.automata.simulator`,
builds a disjoint-column transition table, runs Hopcroft minimization,
records partition-refinement history, and writes reviewed artifacts:

- `scripts/dfa_table.json`
- `scripts/minimization_history.json`
- `backend/automata/url_dfa.json` (final minimized model)
- `docs/automata/diagrams/dfa.dot`
- `docs/automata/diagrams/minimized-dfa.dot`
"""
import sys
import json
from collections import deque

sys.path.insert(0, '.')
from backend.automata import simulator

# Disjoint columns per project notation
COLUMNS = ['h', 't', 'p', 's', 'LOWER', 'DIGIT', ':', '/', '.', '-', '_', '~', 'OTHER']
REP = {'h':'h','t':'t','p':'p','s':'s','LOWER':'a','DIGIT':'0',':':':','/':'/','.':'.','-':'-','_':'_','~':'~','OTHER':'?'}

def extract_states():
    symbols = list('abcdefghijklmnopqrstuvwxyz0123456789:/.-_~?')
    queue = deque(['START'])
    states = set()
    while queue:
        s = queue.popleft()
        if s in states:
            continue
        states.add(s)
        for ch in symbols:
            to = simulator._transition(s, ch)
            if to not in states:
                queue.append(to)
    states.add('SINK')
    return sorted(states)

def build_table(states):
    table = {}
    for s in states:
        row = {col: simulator._transition(s, REP[col]) for col in COLUMNS}
        table[s] = row
    return table

def hopcroft(states, table, accepting):
    P = [set(accepting), set(states)-set(accepting)]
    P = [p for p in P if p]
    work = P.copy()
    history = [ [sorted(list(p)) for p in P] ]
    while work:
        A = work.pop()
        for c in COLUMNS:
            X = set(s for s in states if table[s][c] in A)
            newP = []
            for Y in P:
                inter = Y & X
                diff = Y - X
                if inter and diff:
                    newP.append(inter)
                    newP.append(diff)
                    if Y in work:
                        work.remove(Y)
                        work.append(inter)
                        work.append(diff)
                    else:
                        if len(inter) <= len(diff):
                            work.append(inter)
                        else:
                            work.append(diff)
                else:
                    newP.append(Y)
            P = newP
            history.append([sorted(list(p)) for p in P])
    mapping = {}
    for i, block in enumerate(P):
        for s in block:
            mapping[s] = f'M{i}'
    min_states = sorted(set(mapping[s] for s in states))
    min_table = {}
    for m in min_states:
        rep_state = next(s for s in states if mapping[s] == m)
        min_table[m] = {c: mapping[table[rep_state][c]] for c in COLUMNS}
    min_accepting = sorted({mapping[s] for s in accepting})
    return P, history, mapping, min_states, min_table, min_accepting

def write_dot(table, filename, accepting, start='START'):
    lines = ['digraph DFA {', '  rankdir=LR;']
    # accepting nodes
    if accepting:
        lines.append('  node [shape = doublecircle]; ' + ' '.join(accepting) + ';')
    lines.append('  node [shape = circle];')
    for s, row in table.items():
        for col, dest in row.items():
            label = col
            lines.append(f'  "{s}" -> "{dest}" [label="{label}"];')
    lines.append('}')
    open(filename, 'w', encoding='utf-8').write('\n'.join(lines))

def main():
    states = extract_states()
    table = build_table(states)
    accepting = set(simulator.ACCEPTING_STATES)

    # persist DFA table for traceability
    open('scripts/dfa_table.json','w',encoding='utf-8').write(json.dumps({'columns':COLUMNS,'states':states,'table':table,'accepting':sorted(list(accepting))},indent=2))

    # minimize
    P, history, mapping, min_states, min_table, min_accepting = hopcroft(states, table, accepting)

    # write history
    open('scripts/minimization_history.json','w',encoding='utf-8').write(json.dumps({'partitions_history':history,'final_partitions':[sorted(list(p)) for p in P]},indent=2))

    # write minimized model (machine-readable)
    model = {
        'alphabet': COLUMNS,
        'states': min_states,
        'start_state': mapping['START'],
        'accepting_states': min_accepting,
        'transitions': min_table,
        'provenance': 'Generated from backend.automata.simulator on branch pamela/phase-2-dfa'
    }
    open('backend/automata/url_dfa.json','w',encoding='utf-8').write(json.dumps(model,indent=2))

    # write DOTs
    write_dot(table,'docs/automata/diagrams/dfa.dot', accepting)
    write_dot(min_table,'docs/automata/diagrams/minimized-dfa.dot', min_accepting, start=mapping['START'])

    # summary docs
    open('docs/automata/dfa.md','w',encoding='utf-8').write('# DFA Worksheet\n\nDFA extracted from simulator and minimized. See scripts/dfa_table.json and backend/automata/url_dfa.json for machine-readable artifacts.\n')
    open('docs/automata/minimization.md','w',encoding='utf-8').write('# Minimization proof\n\nFinal partitions and mapping are in scripts/minimization_history.json.\n')

    print('DFA extraction and minimization complete. Artifacts written.')

if __name__ == '__main__':
    main()
