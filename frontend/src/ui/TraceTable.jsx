export default function TraceTable({ trace = [] }) {
  if (trace.length === 0) {
    return (
      <p className="upr-empty-trace" role="status">
        No transition trace is available for this result.
      </p>
    );
  }

  return (
    <div className="trace-wrap" role="region" aria-label="DFA transition trace" tabIndex="0">
      <table className="upr-table">
        <caption className="sr-only">DFA transition trace</caption>
        <thead>
          <tr>
            <th scope="col">Pos.</th>
            <th scope="col">Symbol</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
          </tr>
        </thead>
        <tbody>
          {trace.map((step) => (
            <tr key={step.position}>
              <td>{step.position}</td>
              <td>
                <code>{step.symbol}</code>
              </td>
              <td>{step.from_state}</td>
              <td>{step.to_state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
