// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Farms & Brands", href: "/admin/farms" },
  { label: "Products / Lots", href: "/admin/products" },
  { label: "Orders (B2C)", href: "/admin/orders" },
  { label: "RFQs (B2B)", href: "/admin/rfqs" },
  { label: "Shipments", href: "/admin/shipments" },
  { label: "Content / Journal", href: "/admin/content" },
  { label: "Users & Roles", href: "/admin/users" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-ink p-6 text-cream">
      <Link href="/admin/farms" className="block font-serif text-lg font-bold tracking-wide">
        KERCHANSHE ADMIN
      </Link>
      <nav className="mt-8 space-y-2 text-sm">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded px-3 py-2 transition-colors ${
                isActive
                  ? "bg-roastedGold text-ink font-medium"
                  : "text-cream/70 hover:bg-white/10 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}