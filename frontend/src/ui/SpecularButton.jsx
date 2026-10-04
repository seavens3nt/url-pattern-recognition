import "./styles/specular-button.css";

/** A decorative rim highlight; the caller keeps its existing colors and sizing. */
export default function SpecularButton({ children, className = "", disabled, onPointerMove, ...props }) {
  const followPointer = (event) => {
    if (!disabled && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const angle = Math.atan2(event.clientY - rect.top - rect.height / 2,
        event.clientX - rect.left - rect.width / 2) * 180 / Math.PI + 90;
      button.style.setProperty("--shine-angle", `${angle}deg`);
    }
    onPointerMove?.(event);
  };

  return (
    <button {...props} disabled={disabled} className={`upr-specular ${className}`} onPointerMove={followPointer}>
      {children}
    </button>
  );
}
