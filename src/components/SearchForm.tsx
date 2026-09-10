export function SearchForm({
  initialQuery = "",
  size = "md",
  tone = "default",
}: {
  initialQuery?: string;
  size?: "md" | "lg";
  tone?: "default" | "hero" | "header";
}) {
  const large = size === "lg";
  const hero = tone === "hero";
  const header = tone === "header";

  const shell = hero
    ? "border-white/20 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    : header
      ? "border-white/15 bg-white/10 backdrop-blur"
      : "border-line bg-white shadow-card";

  const input = header
    ? "text-white placeholder:text-white/45"
    : "text-ink placeholder:text-ink-mute";

  const button = "bg-signal text-white hover:bg-signal-deep";

  return (
    <form action="/search" method="get" className="w-full">
      <label className="sr-only" htmlFor="q">
        Поиск по симптому или модели
      </label>
      <div
        className={`flex overflow-hidden rounded-2xl border ${shell} ${large ? "h-14" : "h-11"}`}
      >
        <input
          id="q"
          name="q"
          defaultValue={initialQuery}
          placeholder="Стучит, не заводится, Калина, чек…"
          className={`min-w-0 flex-1 bg-transparent px-4 outline-none ${input} ${large ? "text-base" : "text-sm"}`}
        />
        <button
          type="submit"
          className={`px-5 text-sm font-semibold transition ${button}`}
        >
          Найти
        </button>
      </div>
    </form>
  );
}
