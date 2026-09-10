import { GuideCard } from "@/components/GuideCard";
import { SearchForm } from "@/components/SearchForm";
import { searchGuides } from "@/lib/catalog";

export const metadata = { title: "Поиск" };

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const sp = await searchParams;
  const raw = sp.q;
  const q = Array.isArray(raw) ? raw[0] ?? "" : (raw ?? "");
  const results = q.trim() ? searchGuides(q) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Поиск</h1>
      <div className="mt-6 max-w-xl">
        <SearchForm initialQuery={q} size="lg" />
      </div>
      {q.trim() ? (
        <p className="mt-6 text-sm text-ink-mute">
          {results.length
            ? `Найдено: ${results.length}`
            : "Ничего не нашлось. Попробуйте «стучит», «не заводится», «Калина»."}
        </p>
      ) : (
        <p className="mt-6 text-ink-soft">Введите симптом или модель.</p>
      )}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {results.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
