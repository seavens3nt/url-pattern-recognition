import "./styles/howitworks.css";

const STEPS = [
  {
    title: "User Input",
    text: "The user enters one URL to inspect. The interface sends only that text to the validation API; it does not visit the website or download any content.",
  },
  {
    title: "Request Validation",
    text: "Flask checks that the request contains a non-empty URL string and stays within the transport size limit. Malformed or oversized requests are reported separately from URLs rejected by the automaton.",
  },
  {
    title: "DFA Simulation",
    text: "The simulator starts at the DFA's initial state and reads the URL one symbol at a time. Every symbol follows the reviewed transition table, including transitions to the sink state for unsupported input.",
  },
  {
    title: "Acceptance Decision",
    text: "After the final symbol, the DFA accepts the URL only when it ends in an accepting state. The approved language covers lowercase HTTP or HTTPS, a DNS-style hostname, and an optional simple path.",
  },
  {
    title: "Result Rendering",
    text: "The React interface shows the accepted or rejected verdict, the final DFA state, and the ordered transition trace. Request errors and an offline backend appear as distinct interface states.",
  },
];

function Node({ label }) {
  return (
    <div className="hiw-node">
      <span className="hiw-node__dot" aria-hidden="true" />
      <span className="hiw-node__label">{label}</span>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="hiw-main" id="section-how-it-works">
      <h1 className="hiw-title">How it Works</h1>
      <p className="hiw-sub">Know how our automated system works</p>

      <div className="hiw-flow">
        <Node label="Start" />

        <ol className="hiw-steps">
          {STEPS.map((step, index) => (
            <li
              className="hiw-step"
              key={step.title}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <article className="hiw-card">
                <h2 className="hiw-card__title">{step.title}</h2>
                <p className="hiw-card__text">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>

        <Node label="End" />
      </div>
    </main>
  );
}
