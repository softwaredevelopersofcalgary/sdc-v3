import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        github: z.string(),
        twitter: z.string(),
        linkedin: z.string(),
        website: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("🚀🚀🚀🚀 ~ file: user.ts:31 ~ .mutation ~ input:", input);
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          github: input.github,
          twitter: input.twitter,
          linkedin: input.linkedin,
          website: input.website,
        },
      });
    }),
});
