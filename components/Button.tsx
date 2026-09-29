import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-roastedGold text-ink hover:opacity-90",
  secondary: "bg-ink text-cream hover:opacity-90",
  outline: "border border-ink text-ink bg-transparent hover:bg-ink hover:text-cream",
};

export function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-sans text-sm font-medium transition-colors ${variantClasses[variant]}`}
    >
      {children}
    </Link>
  );
}
