import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import UrlForm from "./UrlForm.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";
import StatusPanel from "./StatusPanel.jsx";
import TraceTable from "./TraceTable.jsx";

afterEach(cleanup);

describe("validator UI components", () => {
  it("renders one controlled URL input and forwards changes", () => {
    const onChange = vi.fn();

    render(
      <UrlForm
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
      <UrlForm
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

  it("announces pending validation", () => {
    render(<LoadingIndicator />);
    expect(screen.getByRole("status")).toHaveTextContent("Validating URL");
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
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

  it("renders a rejected verdict separately from request errors", () => {
    render(
      <StatusPanel
        status="rejected"
        payload={{ message: "Rejected by the DFA.", final_state: "SINK" }}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Rejected by the DFA.");
    expect(screen.getByRole("status")).toHaveTextContent("Final state: SINK");
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

  it("shows an offline message and forwards retry", () => {
    const onRetry = vi.fn();
    render(
      <StatusPanel
        status="offline"
        payload={{ message: "Start Flask and try again.", code: "offline" }}
        onRetry={onRetry}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Backend unavailable");
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders an unexpected response without calling it rejected", () => {
    render(
      <StatusPanel
        status="unexpected"
        payload={{ message: "The response shape is invalid." }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Unexpected response");
    expect(screen.queryByText("Rejected")).not.toBeInTheDocument();
  });

  it("describes an empty transition trace", () => {
    render(<TraceTable trace={[]} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "No transition trace is available"
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
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
