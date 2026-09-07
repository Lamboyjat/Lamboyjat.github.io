import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const evidenceItem = z.object({
  label: z.string(),
  url: z.url(),
  type: z.enum([
    "repository",
    "publication",
    "official-page",
    "commit-history",
    "presentation",
    "demo",
  ]),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    summary: z.string(),
    problem: z.string(),
    contribution: z.string(),
    roleLabel: z.string(),
    ownership: z.enum(["lead", "substantial-contributor", "collaborative"]),
    status: z.enum(["active", "published", "completed"]),
    verificationStatus: z.enum(["verified", "needs-review"]),
    featured: z.boolean(),
    flagship: z.boolean().default(false),
    order: z.number().int().nonnegative(),
    technologies: z.array(z.string()).min(1),
    homepageTechnologies: z.array(z.string()).min(3).max(5).optional(),
    homepageContribution: z.string().optional(),
    caseStudyPath: z.string().startsWith("/").optional(),
    engineeringDecisions: z.array(z.string()).min(1),
    outcome: z.string(),
    collaborators: z.array(z.string()).default([]),
    evidence: z.array(evidenceItem).min(1),
  }),
});

export const collections = { projects };
