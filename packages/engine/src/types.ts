import { z } from "zod";

export const ChoiceSchema = z.object({
  label: z.string(),
  destination: z.string(),
});

export const PageSchema = z.object({
  slug: z.string(),
  content: z.string(),
  choices: z.array(ChoiceSchema),
});

export const AdventureSchema = z.object({
  metadata: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
  }),
  pages: z.record(z.string(), PageSchema),
});

export type Choice = z.infer<typeof ChoiceSchema>;
export type Page = z.infer<typeof PageSchema>;
export type Adventure = z.infer<typeof AdventureSchema>;
