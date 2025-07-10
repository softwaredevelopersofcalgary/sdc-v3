import { z } from "zod";

// Contributor summary from /repos/:owner/:repo/contributors
export const GitHubContributorSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  contributions: z.number().positive(),
});

export const GitHubContributorsArraySchema = z.array(GitHubContributorSchema);
export type GitHubContributor = z.infer<typeof GitHubContributorSchema>;

// Full profile from /users/:username
export const GitHubUserProfileSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  bio: z.string().nullable(),
  email: z.string().nullable(),
  location: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
});

export type GitHubUserProfile = z.infer<typeof GitHubUserProfileSchema>;
