import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const likeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const likeExists = await ctx.prisma.like.findUnique({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
      });

      if (likeExists) {
        return ctx.prisma.like.delete({
          where: {
            projectId_userId: {
              projectId: input.projectId,
              userId: input.userId,
            },
          },
        });
      }

      return ctx.prisma.like.create({
        data: {
          project: {
            connect: {
              id: input.projectId,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),

  findUnique: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.like.findUnique({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
      });
    }),
});
