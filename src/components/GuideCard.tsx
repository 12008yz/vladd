import Link from "next/link";
import { carsOf, nodeById, symptomsOf } from "@/lib/catalog";
import type { Guide } from "@/data/types";

export function GuideCard({ guide }: { guide: Guide }) {
  const node = nodeById(guide.nodeId);
  const cars = carsOf(guide);
  const tags = symptomsOf(guide);

  return (
    <Link
      href={`/guide/${guide.slug}`}
      className="group block rounded-3xl border border-line/80 bg-white/75 p-6 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-signal/35"
    >
      <div className="flex flex-wrap gap-2 text-xs text-ink-mute">
        {cars.map((car) => (
          <span key={car.id}>{car.modelName}</span>
        ))}
        {node ? <span>· {node.name}</span> : null}
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink group-hover:text-steel">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">{guide.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="rounded-lg bg-paper-deep px-2.5 py-1 text-xs font-medium text-steel"
          >
            {tag.name}
          </span>
        ))}
        <span className="rounded-lg bg-signal/10 px-2.5 py-1 text-xs font-medium text-signal-deep">
          {guide.difficulty}
        </span>
      </div>
    </Link>
  );
}
