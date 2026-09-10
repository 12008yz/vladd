import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/GuideCard";
import { generations } from "@/data/catalog";
import { brandOf, getGeneration, guidesForGeneration } from "@/lib/catalog";

export function generateStaticParams() {
  return generations.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: PageProps<"/car/[slug]">) {
  const { slug } = await params;
  const car = getGeneration(slug);
  return { title: car ? `${car.modelName} ${car.years}` : "Модель" };
}

export default async function CarPage({ params }: PageProps<"/car/[slug]">) {
  const { slug } = await params;
  const car = getGeneration(slug);
  if (!car) notFound();

  const brand = brandOf(car);
  const carGuides = guidesForGeneration(car.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-ink-mute">
        <Link href="/" className="hover:text-navy">
          Главная
        </Link>
        {" / "}
        <Link href={`/brand/${brand.slug}`} className="hover:text-navy">
          {brand.name}
        </Link>
        <span> / {car.modelName}</span>
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{car.modelName}</h1>
      <p className="mt-2 text-ink-soft">
        {car.name} · {car.years}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {car.engines.map((engine) => (
          <span key={engine} className="rounded-full bg-white px-3 py-1 text-sm text-navy shadow-card">
            {engine}
          </span>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-ink-mute">Поломки</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {carGuides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
