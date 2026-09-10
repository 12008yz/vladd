export type Brand = {
  id: string;
  slug: string;
  name: string;
  country: string;
  blurb: string;
};

export type Generation = {
  id: string;
  slug: string;
  brandId: string;
  modelName: string;
  name: string;
  years: string;
  engines: string[];
};

export type NodeItem = {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  hint: string;
};

export type Symptom = {
  id: string;
  slug: string;
  name: string;
};

export type GuideVariant = {
  title: string;
  body: string;
};

export type Comment = {
  author: string;
  date: string;
  text: string;
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  generationIds: string[];
  nodeId: string;
  symptomIds: string[];
  summary: string;
  difficulty: "легко" | "средне" | "сложно";
  time: string;
  checks: string[];
  steps: string[];
  warnings: string[];
  diagram: "timing" | "battery" | "suspension" | "sensor";
  variants: GuideVariant[];
  comments: Comment[];
};
