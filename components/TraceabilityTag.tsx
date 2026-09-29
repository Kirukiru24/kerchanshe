/**
 * Traceability tag — Section 10.2: "a small pill component (varietal, process,
 * altitude, score) reused on cards, product pages, and the B2B catalogue."
 */
export function TraceabilityTag({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "dark" | "outline";
}) {
  const toneClasses = {
    default: "bg-deepGreen text-cream",
    dark: "bg-ink text-cream",
    outline: "border border-line text-ink bg-transparent",
  }[tone];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-sans tracking-normal ${toneClasses}`}
    >
      {label}
    </span>
  );
}
