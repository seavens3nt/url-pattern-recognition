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


   /*Annotated URL diagram*/

function TopUnit({ label, tone, children }) {
  return (
    <span className={`ana-unit ana-${tone}`}>
      <span className="ana-label">{label}</span>
      <span className="ana-bracket ana-bracket--top" />
      <span className="ana-text">{children}</span>
    </span>
  );
}

function BottomGroup({ label, tone, children }) {
  return (
    <span className={`ana-group ana-${tone}`}>
      <span className="ana-row">{children}</span>
      <span className="ana-bracket ana-bracket--bottom" />
      <span className="ana-label">{label}</span>
    </span>
  );
}

function UrlDiagram() {
  return (
    <div className="ana-wrap" role="img" aria-label="Annotated example URL">
      <div className="ana-line">
        <BottomGroup label="scheme" tone="pink">
          <span className="ana-text">https://</span>
        </BottomGroup>

        <BottomGroup label="host" tone="green">
          <TopUnit label="subdomain" tone="blue">www.</TopUnit>
          <TopUnit label="domain" tone="green">example</TopUnit>
          <TopUnit label="TLD" tone="orange">.com</TopUnit>
        </BottomGroup>

        <BottomGroup label="path" tone="blue">
          <span className="ana-text">/</span>
          <TopUnit label="subdirectory" tone="purple">forum/questions</TopUnit>
          <span className="ana-text">/</span>
        </BottomGroup>

        <BottomGroup label="query string" tone="green">
          <span className="ana-text">?</span>
          <span className="ana-group ana-green">
            <span className="ana-label">parameter</span>
            <span className="ana-bracket ana-bracket--top" />
            <span className="ana-row">
              <TopUnit label="key" tone="blue">tag</TopUnit>
              <span className="ana-text">=</span>
              <TopUnit label="value" tone="orange">networking</TopUnit>
            </span>
          </span>
          <span className="ana-text">&amp;order=newest</span>
        </BottomGroup>

        <BottomGroup label="fragment" tone="pink">
          <span className="ana-text">#top</span>
        </BottomGroup>
      </div>
    </div>
  );
}


   /*Page*/

export default function HomePage({ onStart }) {
  return (
    <>

      {/* ---------- HERO ---------- */}
      <section className="home-hero" id="section-home">
        <Badge tone="blue" className="home-badge--hero">
          <IconMonitorLock />
        </Badge>

        <div className="home-hero__headline">
          <Badge tone="green" className="home-float home-float--left">
            <IconCloud />
          </Badge>

          <h1 className="home-hero__title">
            URL Pattern
            <br />
            Recognition
          </h1>

          <Badge tone="sky" className="home-float home-float--right">
            <IconLink />
          </Badge>
        </div>

        <p className="home-hero__text">
          An Automated URL Recognizer and Verifier
          <br />
          (Accepts and Rejects URL input)
        </p>

        <button type="button" className="home-start" onClick={onStart}>
          Start
        </button>
      </section>

      {/* ---------- WHAT IS A URL ---------- */}
      <section className="home-section" id="what-is-a-url">
        <Badge tone="sky" className="home-badge--section">
          <IconLink />
        </Badge>
        <h2 className="home-section__title">What is a URL?</h2>
        <p className="home-section__sub">Understanding what is a URL</p>

        <div className="home-cards">
          {URL_CARDS.map((text, index) => (
            <article
              key={index}
              className={`home-card${index === 1 ? " home-card--accent" : ""}`}
            >
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- URL ANATOMY ---------- */}
      <section className="home-section home-anatomy" id="section-anatomy">
        <Badge tone="blue" className="home-badge--section">
          <IconMonitorLock />
        </Badge>
        <h2 className="home-section__title">URL Anatomy</h2>
        <p className="home-section__sub">
          Learn and explore the parts and functions of a URL
        </p>

        <div className="home-anatomy__shell">
          <UrlDiagram />

          <div className="home-anatomy__notes">
            {ANATOMY_SECTIONS.map((section) => (
              <div className="ana-section" key={section.title}>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
