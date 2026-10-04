import SpecularButton from "./SpecularButton.jsx";
import { useState } from "react";
import "../style.css";
import "./styles/home.css";

/*Icons*/
function IconMonitorLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="19" height="13" rx="2" fill="#1d4ed8" opacity="0.15" />
      <rect x="2.5" y="4" width="19" height="13" rx="2" stroke="#1d4ed8" strokeWidth="1.6" />
      <path d="M9 20h6M12 17v3" stroke="#1d4ed8" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="9.5" y="9.5" width="5" height="4.5" rx="1" fill="#1d4ed8" />
      <path d="M10.6 9.5V8.4a1.4 1.4 0 0 1 2.8 0v1.1" stroke="#1d4ed8" strokeWidth="1.3" />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 18a4 4 0 0 1-.4-7.98 5.5 5.5 0 0 1 10.6-1.4A4.3 4.3 0 0 1 18 18H6.5Z"
        fill="#10b981"
        opacity="0.2"
      />
      <path
        d="M6.5 18a4 4 0 0 1-.4-7.98 5.5 5.5 0 0 1 10.6-1.4A4.3 4.3 0 0 1 18 18H6.5Z"
        stroke="#0f9d6e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 15.5v-5m0 0-2 2m2-2 2 2" stroke="#0f9d6e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 1 0-5-5l-1.2 1.2"
        stroke="#2563eb"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 1 0 5 5l1.2-1.2"
        stroke="#3b82f6"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Badge({ children, tone = "blue", className = "" }) {
  return <span className={`home-badge home-badge--${tone} ${className}`}>{children}</span>;
}

   /*Content data*/

const URL_CARDS = [
  "A URL stands for Uniform Resource Locator, and it is the unique web address used to find a specific page, file, or resource on the internet.",
  "A URL is the web address you type into a browser's address bar (or click on via a hyperlink) to navigate directly to a specific webpage, image, document, or online application.",
  "Every URL is built from ordered parts, and each part tells the browser where to go, what to ask for, and how the response should be shaped.",
];

const ANATOMY_SECTIONS = [
  {
    title: "Section 1: The Address Layer (Location)",
    label: "Address layer",
    preview: "Scheme and host identify the destination.",
    shortLabel: "Address",
    shortPreview: "Scheme + host",
    example: "https://www.example.com",
    items: [
      {
        term: "Scheme / Protocol",
        code: "https://",
        children: [
          "Role: Specifies how data is transferred. https indicates a secure, encrypted connection (using SSL/TLS), whereas http is unencrypted.",
        ],
      },
      {
        term: "Host",
        code: "www.example.com",
        children: [
          "Role: The complete server identity, combining the subdomain, main domain, and top-level domain.",
          "Subdomain (www): Specifies a distinct section or server under the primary domain.",
          "Domain (example): The unique registered name of the website.",
          "TLD / Top-Level Domain (.com): The domain extension (e.g., .com, .org, .net) indicating the entity type or region.",
        ],
      },
    ],
  },
  {
    title: "Section 2: The Resource Layer (Navigation)",
    label: "Resource layer",
    preview: "The path locates a resource on that host.",
    shortLabel: "Resource",
    shortPreview: "Path",
    example: "/forum/questions/",
    items: [
      {
        term: "Path",
        code: "/forum/questions/",
        children: [
          "Role: The folder location on the server where the requested page or asset lives.",
          "Subdirectory (forum, questions): Nested folders that organize content hierarchically (e.g., Category > Subcategory).",
        ],
      },
    ],
  },
  {
    title: "Section 3: The Data Layer (Parameters & Filters)",
    label: "Data layer",
    preview: "Query parameters carry values; this recognizer excludes them.",
    shortLabel: "Data",
    shortPreview: "Not accepted here",
    example: "?tag=networking",
    items: [
      {
        term: "Query String",
        code: "?tag=networking&order=newest",
        children: [
          "Role: Passes dynamic key-value data to the server without changing the static page path. Begins with a ? symbol; multiple parameters are separated by &.",
          "Parameter (tag=networking): A complete variable set.",
          "Key (tag, order): The name of the dynamic field or filter being requested.",
          "Value (networking, newest): The specific data assigned to that key.",
        ],
      },
    ],
  },
  {
    title: "Section 4: The View Layer (On-Page Positioning)",
    label: "View layer",
    preview: "A fragment points within a page; this recognizer excludes it.",
    shortLabel: "View",
    shortPreview: "Not accepted here",
    example: "#top",
    items: [
      {
        term: "Fragment / Anchor",
        code: "#top",
        children: [
          "Role: Points to a specific element ID on the web page. The browser jumps directly to this section once the page loads (the # fragment is handled locally by the browser and never sent to the server).",
        ],
      },
    ],
  },
];


   /* A general URL example; query and fragment are outside our DFA language. */

function UrlPart({ label, tone, children, excluded = false }) {
  return (
    <span className={`ana-part ana-${tone}${excluded ? " ana-part--excluded" : ""}`}>
      <span className="ana-text">{children}</span>
      <span className="ana-label">{label}{excluded ? " · excluded" : ""}</span>
    </span>
  );
}

function UrlDiagram() {
  return (
    <div className="ana-wrap" role="group" aria-label="General URL anatomy example">
      <p className="ana-scope-note">General URL example <span>Query and fragment are shown for explanation only; this recognizer rejects them.</span></p>
      <div className="ana-line" aria-label="https://www.example.com/forum/questions/?tag=networking&order=newest#top">
        <UrlPart label="Scheme" tone="pink">https://</UrlPart>
        <UrlPart label="Host" tone="green">www.example.com</UrlPart>
        <UrlPart label="Path" tone="blue">/forum/questions/</UrlPart>
        <UrlPart label="Query string" tone="orange" excluded>?tag=networking&amp;order=newest</UrlPart>
        <UrlPart label="Fragment" tone="purple" excluded>#top</UrlPart>
      </div>
    </div>
  );
}


   /*Page*/

export default function HomePage({ onStart }) {
  const [activeAnatomy, setActiveAnatomy] = useState(null);
  return (
    <>

      {/* ---------- HERO ---------- */}
      <section className="home-hero relative flex min-h-[calc(100svh-var(--upr-header-h))] flex-col items-center justify-center px-6 pt-10 pb-[90px] text-center" id="section-home">
        <Badge tone="blue" className="home-badge--hero">
          <IconMonitorLock />
        </Badge>

        <div className="home-hero__headline">
          <Badge tone="green" className="home-float home-float--left">
            <IconCloud />
          </Badge>

          <h1 className="home-hero__title m-0 text-[clamp(44px,6.5vw,76px)] leading-[1.06] font-extrabold tracking-[-1px] text-[var(--upr-navy)]">
            URL Pattern
            <br />
            Recognition
          </h1>

          <Badge tone="sky" className="home-float home-float--right">
            <IconLink />
          </Badge>
        </div>

        <p className="home-hero__text mt-8 text-[20px] leading-[1.5] text-[#33405f] max-[620px]:text-[17px]">
          An Automated URL Recognizer and Verifier
          <br />
          (Accepts and Rejects URL input)
        </p>

        <SpecularButton type="button" className="home-start mt-10 min-w-[150px] cursor-pointer rounded-full border-0 bg-[var(--upr-navy)] px-10 py-[14px] text-[18px] font-bold text-white shadow-[0_10px_22px_rgba(12,33,96,0.28)] transition-[transform,background] hover:-translate-y-0.5 hover:bg-[var(--upr-navy-deep)] active:translate-y-0 motion-reduce:hover:translate-y-0 max-[620px]:min-w-[132px] max-[620px]:px-8 max-[620px]:py-3 max-[620px]:text-[16px]" onClick={onStart}>
          Start
        </SpecularButton>
      </section>

      {/* ---------- WHAT IS A URL ---------- */}
      <section data-reveal className="home-section px-6 pt-16 pb-[72px] text-center max-[960px]:pt-10 max-[960px]:pb-11" id="what-is-a-url">
        <Badge tone="sky" className="home-badge--section">
          <IconLink />
        </Badge>
        <h2 className="home-section__title m-0 text-[clamp(40px,6vw,64px)] font-extrabold tracking-[-0.6px] text-[var(--upr-navy)]">What is a URL?</h2>
        <p className="home-section__sub mt-[10px] text-[clamp(16px,2vw,20px)] text-[#33405f] opacity-80">Understanding what is a URL</p>

        <div className="home-cards mx-auto mt-[42px] grid w-full max-w-[900px] grid-cols-1 gap-[18px] text-left max-[960px]:mt-8">
          {URL_CARDS.map((text, index) => (
            <article
              key={index}
              className={`home-card flex min-h-[148px] items-center rounded-2xl border px-7 py-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(12,33,96,0.12)] motion-reduce:hover:translate-y-0 max-[620px]:px-[22px] border-[rgba(12,33,96,0.16)] bg-white`}
            >
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- URL ANATOMY ---------- */}
      <section data-reveal className="home-section home-anatomy px-6 py-10 text-center max-[620px]:px-4" id="section-anatomy">
        <Badge tone="blue" className="home-badge--section">
          <IconMonitorLock />
        </Badge>
        <h2 className="home-section__title m-0 text-[clamp(40px,6vw,64px)] font-extrabold tracking-[-0.6px] text-[var(--upr-navy)]">URL Anatomy</h2>
        <p className="home-section__sub mt-[10px] text-[clamp(16px,2vw,20px)] text-[#33405f] opacity-80">
          Learn and explore the parts and functions of a URL
        </p>

        <div className="home-anatomy__shell">
          <UrlDiagram />

          <div className="home-anatomy__notes">
            {ANATOMY_SECTIONS.map((section, index) => (
              <div className="ana-section" key={section.title}>
                <button type="button" className="ana-section__summary" aria-expanded={activeAnatomy === index}
                  aria-controls={`anatomy-panel-${index}`} id={`anatomy-button-${index}`}
                  onClick={() => setActiveAnatomy(activeAnatomy === index ? null : index)}>
                  <span className="ana-section__number">0{index + 1}</span>
                  <strong><span className="ana-summary-full">{section.label}</span><span className="ana-summary-short">{section.shortLabel}</span></strong>
                  <span><span className="ana-summary-full">{section.preview}</span><span className="ana-summary-short">{section.shortPreview}</span></span>
                  <code className="ana-section__example">{section.example}</code>
                </button>
              </div>
            ))}
          </div>
          <div className="ana-panels">
            {ANATOMY_SECTIONS.map((section, index) => (
              <div key={section.title} id={`anatomy-panel-${index}`} role="region"
                aria-labelledby={`anatomy-button-${index}`} aria-hidden={activeAnatomy !== index}
                inert={activeAnatomy !== index} className={`ana-panel${activeAnatomy === index ? " is-open" : ""}`}>
                <div className="ana-panel__clip">
                <div className="ana-section__details">
                  <h3>{section.title}</h3>
                  <ul className="ana-list">
                    {section.items.map((item) => (
                      <li key={item.term}>
                        <strong>{item.term}</strong> (<code>{item.code}</code>)
                        <ul>
                          {item.children.map((child, i) => (
                            <li key={i}>{child}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
