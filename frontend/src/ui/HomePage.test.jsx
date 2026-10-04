import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import HomePage from "./HomePage.jsx";

afterEach(cleanup);

it("keeps card controls in place and toggles one accessible explanation at a time", () => {
  render(<HomePage />);
  const address = screen.getByRole("button", { name: /01 Address/ });
  const resource = screen.getByRole("button", { name: /02 Resource/ });
  fireEvent.click(address);
  expect(address).toHaveAttribute("aria-expanded", "true");
  const panel = document.getElementById(address.getAttribute("aria-controls"));
  expect(panel).toHaveClass("is-open");
  expect(panel).toHaveAttribute("aria-hidden", "false");
  fireEvent.click(resource);
  expect(address).toHaveAttribute("aria-expanded", "false");
  expect(resource).toHaveAttribute("aria-expanded", "true");
  expect(panel).toHaveAttribute("inert");
  fireEvent.click(resource);
  expect(resource).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("region", { name: /02 Resource/ })).not.toBeInTheDocument();
  // Content stays mounted so closing can finish its CSS transition.
  expect(document.getElementById(resource.getAttribute("aria-controls"))).toBeInTheDocument();
});
