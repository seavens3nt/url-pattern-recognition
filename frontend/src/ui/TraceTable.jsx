export default function TraceTable({ trace = [] }) {
  if (trace.length === 0) {
    return <p className="trace-empty">No transitions were produced for this input.</p>;
  }

  return (
    <details className="trace-card">
      <summary>View transition trace ({trace.length} steps)</summary>
      <div className="trace-wrap" tabIndex="0" aria-label="Scrollable transition trace">
        <table>
          <caption className="visually-hidden">DFA transition trace in input order</caption>
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Symbol</th>
              <th scope="col">From state</th>
              <th scope="col">To state</th>
            </tr>
          </thead>
          <tbody>
            {trace.map(step => (
              <tr key={step.position}>
                <td>{step.position}</td>
                <td><code>{step.symbol}</code></td>
                <td><code>{step.from_state}</code></td>
                <td><code>{step.to_state}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
