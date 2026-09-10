import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line/80 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Узел</p>
          <p className="mt-1 text-sm text-white/55">Справочник поломок. MVP без регистрации.</p>
        </div>
        <Link href="/" className="text-sm text-white/70 transition hover:text-signal">
          На главную
        </Link>
      </div>
    </footer>
  );
}
