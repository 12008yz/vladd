import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/GuideCard";
import { nodes } from "@/data/catalog";
import { childNodes, getNode, guidesForNode, parentNode } from "@/lib/catalog";

export function generateStaticParams() {
  return nodes.map((node) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }: PageProps<"/node/[slug]">) {
  const { slug } = await params;
  const node = getNode(slug);
  return { title: node?.name ?? "Узел" };
}

export default async function NodePage({ params }: PageProps<"/node/[slug]">) {
  const { slug } = await params;
  const node = getNode(slug);
  if (!node) notFound();

  const parent = parentNode(node);
  const children = childNodes(node.id);
  const list = guidesForNode(node.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-ink-mute">
        <Link href="/" className="hover:text-navy">
          Главная
        </Link>
        {parent ? (
          <>
            {" / "}
            <Link href={`/node/${parent.slug}`} className="hover:text-navy">
              {parent.name}
            </Link>
          </>
        ) : null}
        <span> / {node.name}</span>
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{node.name}</h1>
      <p className="mt-2 text-ink-soft">{node.hint}</p>

      {children.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {children.map((child) => (
            <Link
              key={child.id}
              href={`/node/${child.slug}`}
              className="rounded-full bg-white px-3 py-1 text-sm text-navy shadow-card"
            >
              {child.name}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {list.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
