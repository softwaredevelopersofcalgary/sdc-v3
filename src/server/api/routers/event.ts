/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { createEventSchema } from "./Event/event.schema";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return events;
  }),

  findUnique: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;

      const event = await ctx.prisma.event.findUnique({
        where: {
          id: input.id,
        },

        include: {
          users: {
            select: {
              id: true,
              name: true,
            },
          },
          projects: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              members: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
              comments: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      title: true,
                      image: true,
                      techs: {
                        include: {
                          tech: {
                            select: {
                              id: true,
                              label: true,
                              imgUrl: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                orderBy: {
                  createdAt: "desc",
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

      if (currentUser) {
        const projectsWithUser = event?.projects?.map((project) => {
          const isMember = project?.members?.some(
            (member) => member.id === currentUser.id
          );

          return {
            ...project,
            isMember,
          };
        });

        const isUserPartOfAnyProject = projectsWithUser?.some(
          (project) => project.isMember
        );

        return {
          ...event,
          projects: projectsWithUser?.map((project) => ({
            ...project,
            isUserPartOfAnyProject,
          })),
        };
      }

      return event;
    }),

  create: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.create({
        data: {
          ...input,
        },
      });

      return event;
    }),
});
