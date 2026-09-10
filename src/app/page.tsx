import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { HeroSlider } from "@/components/HeroSlider";
import { brands, guides, nodes } from "@/data/catalog";
import { generationsByBrand, rootNodes } from "@/lib/catalog";

export default function HomePage() {
  const preview = guides.slice(0, 4);
  const nodeRoots = rootNodes.length ? rootNodes : nodes.filter((n) => !n.parentId);

  return (
    <div>
      <HeroSlider />

      <section className="section-reveal mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Каталог</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Марки
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {brands.map((brand) => {
            const cars = generationsByBrand(brand.id);
            return (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-line/80 bg-white/70 p-7 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-signal/30"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-signal/10 transition group-hover:scale-125" />
                <div className="relative">
                  <div className="text-sm text-ink-mute">{brand.country}</div>
                  <div className="mt-1 font-display text-2xl font-semibold text-steel sm:text-3xl">
                    {brand.name}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{brand.blurb}</p>
                  <p className="mt-5 text-sm font-medium text-ink-mute">
                    {cars.map((car) => car.modelName).join(" · ")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line/70 bg-steel text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Система</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Узлы</h2>
          <p className="mt-3 max-w-lg text-white/65">От корня к симптому — как устроена машина в справочнике.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {nodeRoots.map((node) => (
              <Link
                key={node.id}
                href={`/node/${node.slug}`}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 transition hover:border-signal/40 hover:bg-white/10"
              >
                <div className="font-medium text-white">{node.name}</div>
                <div className="mt-1 text-sm text-white/55">{node.hint}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Практика</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Карточки
            </h2>
          </div>
          <span className="text-sm text-ink-mute">{guides.length} в демо</span>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {preview.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
}
