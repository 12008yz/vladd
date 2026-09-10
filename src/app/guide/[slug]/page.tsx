import Link from "next/link";
import { notFound } from "next/navigation";
import { Diagram } from "@/components/Diagram";
import { GuideCard } from "@/components/GuideCard";
import { guides } from "@/data/catalog";
import {
  brandOf,
  carsOf,
  getGuide,
  nodeById,
  relatedGuides,
  symptomsOf,
} from "@/lib/catalog";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guide/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return { title: guide?.title ?? "Карточка" };
}

export default async function GuidePage({ params }: PageProps<"/guide/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const node = nodeById(guide.nodeId);
  const cars = carsOf(guide);
  const tags = symptomsOf(guide);
  const related = relatedGuides(guide).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-ink-mute">
        <Link href="/" className="hover:text-navy">
          Главная
        </Link>
        {cars[0] ? (
          <>
            {" / "}
            <Link href={`/brand/${brandOf(cars[0]).slug}`} className="hover:text-navy">
              {brandOf(cars[0]).name}
            </Link>
            {" / "}
            <Link href={`/car/${cars[0].slug}`} className="hover:text-navy">
              {cars[0].modelName}
            </Link>
          </>
        ) : null}
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{guide.title}</h1>
      <p className="mt-3 text-lg leading-8 text-ink-soft">{guide.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        {tags.map((tag) => (
          <span key={tag.id} className="rounded-full bg-mist px-3 py-1 text-navy">
            {tag.name}
          </span>
        ))}
        {node ? (
          <Link href={`/node/${node.slug}`} className="rounded-full bg-white px-3 py-1 shadow-card">
            {node.name}
          </Link>
        ) : null}
        <span className="rounded-full bg-white px-3 py-1 text-ink-mute shadow-card">
          {guide.difficulty} · {guide.time}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
        {cars.map((car) => (
          <Link key={car.id} href={`/car/${car.slug}`} className="hover:text-navy">
            {car.modelName} {car.years}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Diagram kind={guide.diagram} />
      </div>

      {guide.warnings.length > 0 ? (
        <aside className="mt-8 rounded-2xl bg-warn-bg px-5 py-4 text-sm leading-6 text-warn">
          {guide.warnings.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </aside>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Что проверить</h2>
        <ol className="mt-4 space-y-3">
          {guide.checks.map((item, index) => (
            <li key={item} className="flex gap-3 text-ink-soft leading-7">
              <span className="mt-0.5 w-6 shrink-0 text-sm text-navy">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Решение</h2>
        <ol className="mt-4 space-y-3">
          {guide.steps.map((item, index) => (
            <li key={item} className="flex gap-3 leading-7 text-ink-soft">
              <span className="mt-0.5 w-6 shrink-0 text-sm text-navy">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {guide.variants.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Другие подходы</h2>
          <div className="mt-4 space-y-3">
            {guide.variants.map((variant) => (
              <div key={variant.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <h3 className="font-medium text-ink">{variant.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{variant.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Комментарии</h2>
        <p className="mt-1 text-sm text-ink-mute">Демо без регистрации. Живые аккаунты — следующим этапом.</p>
        {guide.comments.length === 0 ? (
          <p className="mt-4 text-ink-soft">Пока никто не написал.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {guide.comments.map((comment) => (
              <li key={comment.author + comment.date} className="rounded-2xl border border-line bg-white p-5">
                <div className="text-sm text-ink-mute">
                  {comment.author} · {comment.date}
                </div>
                <p className="mt-2 leading-7 text-ink-soft">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Рядом</h2>
          <div className="mt-4 grid gap-4">
            {related.map((item) => (
              <GuideCard key={item.id} guide={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
