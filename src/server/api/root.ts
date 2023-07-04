import { createTRPCRouter } from "~/server/api/trpc";
import { drinks } from "./routers/drinks";
import { ingredients } from "./routers/ingredients";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  drinksRouter: drinks,
  ingredientsRouter: ingredients,
});

// export type definition of API
export type AppRouter = typeof appRouter;
