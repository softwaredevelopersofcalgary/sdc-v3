import {
    createTRPCRouter,
    publicProcedure,
  } from "@/server/api/trpc";
  import { z } from "zod";
  
  export const superProjectRouter = createTRPCRouter({
  
    findByUser: publicProcedure
      .input(
        z.object({
          userId: z.string(),
        })
      )
      .query(async ({ ctx, input }) => {
        return ctx.prisma.superProject.findMany({
          where: {
            OR: [  
            {
              projects:{
                some:{
                    members:{
                        some:{
                            id:input.userId
                        }
                    }
                }
            }},{
              authorId: input.userId,

            }]
          },
        });
      }),
  });
  