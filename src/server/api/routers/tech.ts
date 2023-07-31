import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const techRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.masterTech.findMany();
  }),
});
