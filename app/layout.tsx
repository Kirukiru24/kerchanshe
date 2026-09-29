import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kerchanshe Group — Agriculture",
  description:
    "One Group. Six Origins. One Story of Ethiopian Coffee. Kerchanshe Group's coffee and agro-processing estates.",
};

const NAV_LINKS = [
  { href: "/agriculture", label: "Our Farms" },
  { href: "/agriculture/shop", label: "Shop" },
  { href: "/agriculture/wholesale", label: "Wholesale/B2B" },
  { href: "/agriculture/about", label: "Our Story" },
  { href: "/agriculture/journal", label: "Journal" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink antialiased">
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <Link href="/agriculture" className="font-serif text-lg tracking-wide">
            ◆ KERCHANSHE
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-roastedGold">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/agriculture/shop"
            className="rounded-full bg-roastedGold px-4 py-2 text-sm font-medium text-ink"
          >
            Shop Coffee
          </Link>
        </header>

        <main>{children}</main>

        <footer className="mt-16 bg-ink px-6 py-10 text-cream">
          <p className="font-serif text-lg">KERCHANSHE GROUP</p>
          <div className="mt-6 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <div>
              <p className="font-medium">Our Farms</p>
              <p className="mt-1 opacity-70">Sustainability</p>
            </div>
            <div>
              <p className="font-medium">Shop</p>
              <p className="mt-1 opacity-70">Careers</p>
            </div>
            <div>
              <p className="font-medium">Wholesale</p>
              <p className="mt-1 opacity-70">Contact</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
