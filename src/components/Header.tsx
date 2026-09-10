import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
        <Link
          href="/"
          className="shrink-0 font-display text-lg font-semibold tracking-tight text-white"
        >
          Узел
        </Link>
        <div className="min-w-0 flex-1">
          <SearchForm tone="header" />
        </div>
        <nav className="flex gap-5 text-sm text-white/70">
          <Link href="/brand/lada" className="transition hover:text-signal">
            Lada
          </Link>
          <Link href="/brand/toyota" className="transition hover:text-signal">
            Toyota
          </Link>
        </nav>
      </div>
    </header>
  );
}
