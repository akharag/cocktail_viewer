import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ingredients = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const ingredients = await ctx.prisma.ingredient.findMany({
      take: 100,
      orderBy: [{ name: "desc" }],
    });
    return ingredients;
  }),
  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const ingredients = await ctx.prisma.ingredient.findFirst({
      where: { name: input },
    });
    return ingredients;
  }),
});
