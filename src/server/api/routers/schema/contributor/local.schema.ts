import { z } from "zod";

// Prisma-style database model validation
export const contributorSchema = z.object({
  id: z.string(),
  githubLogin: z.string(),
  name: z.string().nullable(),
  imgUrl: z.string().nullable(),
  contributions: z.number(),
  sortRank: z.number(),
  showPublic: z.boolean(),
  createdAt: z.date(),
  githubUrl: z.string().nullable(),
  lastFetched: z.date(),
});

export type Contributor = z.infer<typeof contributorSchema>;

// Optional simplified display-only version
export const contributorDisplaySchema = z.object({
  githubLogin: z.string(),
  displayName: z.string(),
  imgUrl: z.string().nullable(),
  contributions: z.number(),
  githubUrl: z.string().nullable(),
  sortRank: z.number(),
});

export type ContributorDisplay = z.infer<typeof contributorDisplaySchema>;
