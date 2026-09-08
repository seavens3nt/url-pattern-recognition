# URL Pattern Recognition

An Automata Theory web application that recognizes supported URL patterns using a deterministic finite automaton (DFA).

## Project status

Initial project repository. The team roles, technology choices, and development workflow are documented. Application code and the formal URL language are not implemented yet.

## Planned workflow

1. Define the supported URL language and alphabet.
2. Design the regular expression and equivalent NFA.
3. Convert the NFA to a DFA using subset construction.
4. Minimize the DFA and document equivalence.
5. Implement the Python simulator and Flask API.
6. Connect the React frontend and display acceptance results and state traces.
7. Test, document, and demonstrate the complete web application.

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | React + Vite |
| Styling | CSS |
| UI/UX design | Figma |
| Backend API | Python + Flask |
| Automata logic | Custom Python modules |
| Diagrams | Graphviz |
| Testing | pytest, Vitest, React Testing Library |
| Collaboration | Git + GitHub |

The browser sends a URL to the Flask API. The Python DFA simulator processes it and returns acceptance status and a transition trace for React to display. A database is not required for the core project.

## Repository structure

```text
frontend/          React web application
backend/           Flask API
backend/automata/  Automata definitions and simulator
tests/             Shared test cases and integration tests
docs/              Language specification, diagrams, roles, and stack
```

These folders are starting points; runtime dependencies and setup commands will be added with the first implementation.

## Team and documentation

- [Team roles and responsibilities](docs/team-roles.md)
- [Detailed tech stack](docs/tech-stack.md)
- [Contribution workflow](CONTRIBUTING.md)
- [Shared project document](https://docs.google.com/document/d/1d69DL9JlwwhTE8vPeQ9kBaWEzZUrey_OtatF9RUvFCk/edit)

