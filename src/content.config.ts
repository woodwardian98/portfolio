import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).optional(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      cvvs: z.number().optional(),
      cve: z.string().optional(),
      threat_actor: z.string().optional(),
      industry: z.string().optional(),
    }),
});

export const collections = { blog };
