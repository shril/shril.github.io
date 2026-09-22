import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    org: z.string(),
    period: z.string(),
    order: z.number(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { work };
