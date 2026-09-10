import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/GuideCard";
import { brands } from "@/data/catalog";
import { generationsByBrand, getBrand, guidesForGeneration } from "@/lib/catalog";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps<"/brand/[slug]">) {
  const { slug } = await params;
  const brand = getBrand(slug);
  return { title: brand?.name ?? "Марка" };
}

export default async function BrandPage({ params }: PageProps<"/brand/[slug]">) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const cars = generationsByBrand(brand.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-ink-mute">
        <Link href="/" className="hover:text-navy">
          Главная
        </Link>
        <span> / {brand.name}</span>
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{brand.name}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{brand.blurb}</p>

      <div className="mt-10 space-y-10">
        {cars.map((car) => {
          const carGuides = guidesForGeneration(car.id);
          return (
            <section key={car.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">
                    <Link href={`/car/${car.slug}`} className="hover:text-navy">
                      {car.modelName}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    {car.name} · {car.years} · {car.engines.join(", ")}
                  </p>
                </div>
                <Link href={`/car/${car.slug}`} className="text-sm text-navy hover:underline">
                  Вся модель
                </Link>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {carGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
