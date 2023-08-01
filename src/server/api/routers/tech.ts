import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const techRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.masterTech.findMany();
  }),
});
