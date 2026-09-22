import "./styles/howitworks.css";

const STEPS = [
  {
    title: "User Input",
    text: "The user enters a URL pattern such as /users/:userID/posts/:postId and a test URL to evaluate against it. A Case Sensitivity toggle decides whether literal segments must match exactly.",
  },
  {
    title: "Input Validation",
    text: "Before any matching happens, both fields are checked. The pattern must begin with a forward slash, contain no whitespace, name every dynamic segment, and avoid duplicate parameter keys. The URL is checked for whitespace and for a supported http or https scheme. If any rule fails, the process stops and the INPUT INVALID state is returned along with a list of reasons.",
  },
  {
    title: "URL Parsing",
    text: "The test URL is broken into its parts. Protocol, hostname, pathname, and query string are separated, and the path is split into ordered segments for comparison.",
  },
  {
    title: "Segment Matching",
    text: "The pattern and the URL are compared segment by segment. Segment counts must agree. Literal segments must match, honoring the case sensitivity setting. Dynamic segments beginning with a colon capture their value, which is decoded and assigned a data type such as Numeric String, Alphanumeric String, or UUID. Query pairs are collected separately and tagged as Key-Value Pairs.",
  },
  {
    title: "Result Rendering",
    text: "A match returns the ACCEPTED state with the execution time, the URL Segment Anatomy panel, and the table of extracted dynamic parameters. A mismatch returns REJECTED with the specific reasons. Any unexpected failure falls through to the error state.",
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
