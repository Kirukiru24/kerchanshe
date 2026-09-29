// app/page.tsx
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export default function RootPage() {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Top Portal Navigation Bar */}
      <header className="bg-slate-900 text-white px-6 py-2.5 flex justify-between items-center text-xs sm:text-sm font-medium z-50 border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-300 font-semibold tracking-wide uppercase">
            Kerchanshe Group Network
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/agriculture"
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-md font-medium transition-colors shadow-sm"
          >
            <span>Access Agriculture Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Embedded Working Site */}
      <iframe
        src="https://kerchanshegroup.com/kerchanshe-coffee.html"
        className="w-full flex-grow border-0"
        title="Kerchanshe Coffee - Landing Page"
      />
    </div>
  );
}