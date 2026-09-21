import { useState } from "react";
import "../style.css";
import "./styles/nav.css";

export const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "recognizer", label: "Recognizer" },
  { key: "how-it-works", label: "How it Works" },
  { key: "about", label: "About Us" },
];

export function Logo({ size = "large" }) {
  return (
    <div className={`upr-logo upr-logo--${size}`} aria-label="URL logo">
      <span className="upr-logo__dome" />
      <span className="upr-logo__text">
        <span>U</span>
        <span>R</span>
        <span>L</span>
      </span>
    </div>
  );
}

export function Navbar({ current = "home" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="upr-header">
      <a
        className="upr-brand"
        href="#/home"
        aria-label="Go to home"
        onClick={() => setOpen(false)}
      >
        <Logo size="large" />
      </a>

      <button
        type="button"
        className={`upr-burger${open ? " is-open" : ""}`}
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`upr-nav${open ? " is-open" : ""}`}
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href={`#/${item.key}`}
            className={current === item.key ? "is-active" : undefined}
            aria-current={current === item.key ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Footer({ current = "home" }) {
  return (
    <footer className="upr-footer">
      <Logo size="small" />
      <p className="upr-copy">&copy; 2026 [@matthewvisuals]. All rights reserved.</p>
      <nav className="upr-footer-nav" aria-label="Footer navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href={`#/${item.key}`}
            className={current === item.key ? "is-active" : undefined}
            aria-current={current === item.key ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}

export default function Layout({ current, plain = false, children }) {
  return (
    <div className={`upr-page${plain ? " home-page" : ""}`}>
      <Navbar current={current} />
      {children}
      <Footer current={current} />
    </div>
  );
}
