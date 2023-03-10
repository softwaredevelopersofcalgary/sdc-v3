import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany();

    return events;
  }),

  findUnique: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: input.id,
        },

        include: {
          projects: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              _count: {
                select: {
                  likes: true,
                },
              },
              techs: {
                include: {
                  tech: {
                    select: {
                      label: true,
                    },
                  },
                },
              },
              author: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return event;
    }),
});
