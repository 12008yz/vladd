import { brands, generations, guides, nodes, symptoms } from "@/data/catalog";
import type { Brand, Generation, Guide, NodeItem, Symptom } from "@/data/types";

export function getBrand(slug: string) {
  return brands.find((item) => item.slug === slug);
}

export function getGeneration(slug: string) {
  return generations.find((item) => item.slug === slug);
}

export function getNode(slug: string) {
  return nodes.find((item) => item.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((item) => item.slug === slug);
}

export function generationsByBrand(brandId: string) {
  return generations.filter((item) => item.brandId === brandId);
}

export function guidesForGeneration(generationId: string) {
  return guides.filter((item) => item.generationIds.includes(generationId));
}

export function guidesForNode(nodeId: string) {
  const childIds = nodes.filter((item) => item.parentId === nodeId).map((item) => item.id);
  const ids = new Set([nodeId, ...childIds]);
  return guides.filter((item) => ids.has(item.nodeId));
}

export function brandOf(generation: Generation) {
  return brands.find((item) => item.id === generation.brandId)!;
}

export function nodeById(id: string) {
  return nodes.find((item) => item.id === id);
}

export function symptomsOf(guide: Guide): Symptom[] {
  return guide.symptomIds
    .map((id) => symptoms.find((item) => item.id === id))
    .filter((item): item is Symptom => Boolean(item));
}

export function carsOf(guide: Guide): Generation[] {
  return guide.generationIds
    .map((id) => generations.find((item) => item.id === id))
    .filter((item): item is Generation => Boolean(item));
}

export function relatedGuides(guide: Guide) {
  return guides.filter(
    (item) =>
      item.id !== guide.id &&
      (item.nodeId === guide.nodeId ||
        item.generationIds.some((id) => guide.generationIds.includes(id))),
  );
}

export function parentNode(node: NodeItem) {
  return node.parentId ? nodes.find((item) => item.id === node.parentId) : undefined;
}

export function childNodes(nodeId: string) {
  return nodes.filter((item) => item.parentId === nodeId);
}

export const rootNodes = nodes.filter((item) => item.parentId === null);

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-z0-9а-я\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchGuides(query: string) {
  const q = normalize(query);
  if (!q) return [];

  const stop = new Set(["не", "на", "по", "и", "в", "с", "для", "или", "как"]);
  const tokens = q.split(" ").filter((token) => token.length > 1 && !stop.has(token));

  return guides
    .map((guide) => {
      const generationText = carsOf(guide)
        .map((car) => `${car.modelName} ${car.name} ${car.engines.join(" ")}`)
        .join(" ");
      const hay = normalize(
        [
          guide.title,
          guide.summary,
          guide.checks.join(" "),
          guide.steps.join(" "),
          symptomsOf(guide)
            .map((item) => item.name)
            .join(" "),
          nodeById(guide.nodeId)?.name ?? "",
          generationText,
        ].join(" "),
      );

      let score = 0;
      if (hay.includes(q)) score += 8;
      for (const token of tokens) {
        if (hay.includes(token)) score += 2;
      }
      return { guide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.guide);
}

export type { Brand, Generation, Guide, NodeItem, Symptom };
