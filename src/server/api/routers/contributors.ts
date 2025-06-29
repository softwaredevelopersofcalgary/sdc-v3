import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchGitHubContributors } from "@/helpers/github";

export const contributorsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.contributor.findMany({
      where: { showPublic: true },
      orderBy: { sortRank: 'asc' },
    });
  }),

  updateFromGitHub: publicProcedure.mutation(async ({ ctx }) => {
    const githubContributors = await fetchGitHubContributors();
    
    for (const [index, contributor] of githubContributors.entries()) {
      await ctx.prisma.contributor.upsert({
        where: { githubLogin: contributor.login },
        update: {
          contributions: contributor.contributions,
          sortRank: index + 1,
          imgUrl: contributor.avatar_url,
          githubUrl: contributor.html_url,
          lastFetched: new Date(),
          updatedAt: new Date(),
        },
        create: {
          githubLogin: contributor.login,
          name: contributor.name || contributor.login,
          imgUrl: contributor.avatar_url,
          githubUrl: contributor.html_url,
          contributions: contributor.contributions,
          sortRank: index + 1,
          showPublic: true,
          lastFetched: new Date(),
        },
      });
    }
    
    return { success: true, count: githubContributors.length };
  }),
});