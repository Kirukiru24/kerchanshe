/**
 * Process-step component — Section 10.2: "numbered circular badge + image +
 * caption, used on every farm's 'Our Process' page."
 */
export function ProcessStep({ number, title }: { number: number; title: string }) {
  return (
    <div>
      <div className="aspect-[4/3] w-full bg-cream" aria-hidden />
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-deepGreen text-sm text-cream">
          {number}
        </span>
        <p className="font-sans text-sm font-medium text-ink">{title}</p>
      </div>
    </div>
  );
}
