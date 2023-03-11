/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
      const currentUser = ctx.session?.user;

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
                      image: true,
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

      // Add a boolean to each project to indicate if the current user is a member of the project in this event. There will also be a boolean named isPartOfProject to show if the user is a part of any of the projects in this event

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

      // if (currentUser) {
      //   const projectsWithUser = event?.projects?.map((project) => {
      //     const isMember = project?.members?.some(
      //       (member) => member.id === currentUser.id
      //     );

      //     return {
      //       ...project,
      //       isMember,
      //     };
      //   });

      //   return {
      //     ...event,
      //     projects: projectsWithUser,
      //   };
      // }

      return event;
    }),
});
