/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const chapterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const chapters = await ctx.prisma.chapter.findMany();

    return chapters;
  }),
});
