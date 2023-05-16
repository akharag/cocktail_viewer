import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const drinksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.prisma.drink.findMany({
      take: 100,
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        tags: true,
      },
      orderBy: [{ name: "desc" }],
    });
    return drinks;
  }),
  getAllNames: publicProcedure.query(async ({ ctx }) => {
    const names = await ctx.prisma.drink.findMany({
      take: 100,
      select: {
        name: true,
      },
    });
    return names;
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const drink = await ctx.prisma.drink.findFirst({
      where: { name: input },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        tags: true,
      },
    });
    return drink;
  }),
  getByQuery: publicProcedure
    .input(z.string().nonempty())
    .query(async ({ ctx, input }) => {
      console.log(input);
      const drinks = await ctx.prisma.drink.findMany({
        take: 5,
        where: {
          OR: [
            {
              name: {
                contains: input,
              },
            },
            {
              ingredients: {
                some: {
                  ingredientName: {
                    contains: input,
                  },
                },
              },
            },
            {
              tags: {
                some: {
                  name: {
                    contains: input,
                  },
                },
              },
            },
          ],
        },
      });
      return drinks;
    }),
});
