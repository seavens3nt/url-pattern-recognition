import json,sys

def main():
    j=json.load(open('backend/automata/url_dfa.json'))
    cols=j['alphabet']
    states=j['states']
    t=j['transitions']
    errs=[]
    for s in states:
        if s not in t:
            errs.append(f"missing state {s}")
            continue
        row=t[s]
        missing=[c for c in cols if c not in row]
        if missing:
            errs.append(f"{s} missing cols {missing}")
        for c,d in row.items():
            if d not in states:
                errs.append(f"{s} col {c} -> unknown {d}")
    if errs:
        print('\n'.join(errs))
        sys.exit(2)
    print('Validation OK')

if __name__ == '__main__':
    main()
