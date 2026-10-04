import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import SpecularButton from "./SpecularButton.jsx";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("keeps native submission and follows the pointer without overriding caller styles", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.stubGlobal("PointerEvent", MouseEvent);
  const submit = vi.fn((event) => event.preventDefault());
  render(<form onSubmit={submit}><SpecularButton type="submit" className="bg-navy">Start</SpecularButton></form>);
  const button = screen.getByRole("button", { name: "Start" });
  fireEvent.pointerMove(button, { clientX: 10, clientY: 20 });
  expect(parseFloat(button.style.getPropertyValue("--shine-angle"))).toBeCloseTo(153.435);
  expect(button).toHaveClass("bg-navy");
  fireEvent.click(button);
  expect(submit).toHaveBeenCalledOnce();
});

it("skips pointer animation for reduced motion and disabled buttons", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  const click = vi.fn();
  const { rerender } = render(<SpecularButton onClick={click}>Retry</SpecularButton>);
  const button = screen.getByRole("button", { name: "Retry" });
  fireEvent.pointerMove(button);
  expect(button.style.getPropertyValue("--shine-angle")).toBe("");
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  rerender(<SpecularButton disabled onClick={click}>Retry</SpecularButton>);
  fireEvent.pointerMove(button);
  fireEvent.click(button);
  expect(button.style.getPropertyValue("--shine-angle")).toBe("");
  expect(click).not.toHaveBeenCalled();
});
