import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage.jsx";

afterEach(cleanup);

describe("HomePage", () => {
  it("renders the hero headline", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("URL Pattern");
    expect(heading.textContent).toContain("Recognition");
  });

  it("renders the hero description", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/An Automated URL Recognizer and Verifier/i)
    ).toBeTruthy();
  });

  it("calls onStart when the Start button is clicked", () => {
    const onStart = vi.fn();
    render(<HomePage onStart={onStart} />);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("renders the What is a URL section with three cards", () => {
    const { container } = render(<HomePage />);
    expect(screen.getByText("What is a URL?")).toBeTruthy();
    expect(container.querySelectorAll(".home-card")).toHaveLength(3);
  });

  it("highlights the middle card", () => {
    const { container } = render(<HomePage />);
    const cards = container.querySelectorAll(".home-card");
    expect(cards[1].classList.contains("home-card--accent")).toBe(true);
  });

  it("renders the URL Anatomy diagram and all four layer sections", () => {
    const { container } = render(<HomePage />);
    expect(screen.getByText("URL Anatomy")).toBeTruthy();
    expect(
      screen.getByRole("img", { name: /annotated example url/i })
    ).toBeTruthy();
    expect(container.querySelectorAll(".ana-section")).toHaveLength(4);
  });

  it("labels the diagram parts", () => {
    render(<HomePage />);
    [
      "subdomain",
      "domain",
      "TLD",
      "subdirectory",
      "parameter",
      "key",
      "value",
    ].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

});
