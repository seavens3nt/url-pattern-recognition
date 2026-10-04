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
    <main className="hiw-main w-full flex-[1_0_auto] bg-transparent px-6 pt-[46px] pb-[84px] text-center max-[620px]:px-4 max-[620px]:pt-[34px] max-[620px]:pb-16" id="section-how-it-works">
      <h1 className="hiw-title m-0 text-[clamp(42px,6vw,64px)] font-extrabold tracking-[-0.8px] text-[var(--upr-navy)]">How it Works</h1>
      <p className="hiw-sub mx-auto mt-4 max-w-[760px] text-[clamp(16px,2vw,20px)] leading-[1.5] text-[var(--upr-navy)] opacity-70">Know how our automated system works</p>

      <div className="hiw-flow">
        <Node label="Start" />

        <ol className="hiw-steps">
          {STEPS.map((step) => (
            <li
              data-reveal
              className="hiw-step"
              key={step.title}
            >
              <article className="hiw-card rounded-[18px] border border-[rgba(12,33,96,0.28)] bg-white px-8 py-7 text-left shadow-[0_8px_18px_rgba(12,33,96,0.07)] transition-[transform,box-shadow,border-color] hover:-translate-y-[3px] hover:border-[var(--upr-teal)] hover:shadow-[0_14px_28px_rgba(12,33,96,0.12)] max-[620px]:px-5 max-[620px]:py-6 motion-reduce:hover:translate-y-0">
                <h2 className="hiw-card__title mb-3 text-[clamp(20px,2.6vw,24px)] font-extrabold text-[var(--upr-navy)]">{step.title}</h2>
                <p className="hiw-card__text text-[clamp(16px,1.8vw,18px)] leading-[1.7] text-[#33405f]">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>

        <Node label="End" />
      </div>
    </main>
  );
}
