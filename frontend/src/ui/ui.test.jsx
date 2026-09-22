import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage.jsx";
import URLForm from "./URLForm.jsx";
import StatusPanel from "./StatusPanel.jsx";
import TraceTable from "./TraceTable.jsx";

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

  it("renders one controlled URL input and forwards changes", () => {
    const onChange = vi.fn();

    render(
      <URLForm
        value="https://example.com"
        onChange={onChange}
        helpText="The simulator reads the URL text only."
      />
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    expect(screen.getByLabelText("URL to inspect")).toHaveValue(
      "https://example.com"
    );
    fireEvent.change(screen.getByLabelText("URL to inspect"), {
      target: { value: "https://example.org" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("forwards submit actions and exposes loading and error states", () => {
    const onSubmit = vi.fn();

    render(
      <URLForm
        value="https://example.com"
        onSubmit={onSubmit}
        loading
        errorText="Enter a valid URL."
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid URL.");
    expect(screen.getByRole("button", { name: "Validating..." })).toBeDisabled();
    expect(screen.getByLabelText("URL to inspect")).toBeDisabled();

    fireEvent.submit(screen.getByRole("button", { name: "Validating..." }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders API verdict messages and final states", () => {
    render(
      <StatusPanel
        status="accepted"
        payload={{
          message: "Accepted by the DFA.",
          final_state: "TLD_MANY",
        }}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Accepted by the DFA.");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Final state: TLD_MANY"
    );
    expect(screen.queryByText(/HTTP 200|Execution Time/)).toBeNull();
  });

  it("keeps request errors separate from rejected verdicts", () => {
    render(
      <StatusPanel
        status="invalid"
        payload={{ message: "A non-empty URL string is required." }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Request error");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "A non-empty URL string is required."
    );
    expect(screen.queryByText("REJECTED")).toBeNull();
  });

  it("renders supplied trace rows through props", () => {
    render(
      <TraceTable
        trace={[
          { position: 0, symbol: "h", from_state: "START", to_state: "H" },
          { position: 1, symbol: "t", from_state: "H", to_state: "HT" },
        ]}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("START")).toBeInTheDocument();
    expect(screen.getByText("HT")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

});
