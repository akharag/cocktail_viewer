import { createTRPCRouter } from "~/server/api/trpc";
import { drinksRouter } from "./routers/drinks";
import { ingredientsRouter } from "./routers/ingredients";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  drinksRouter,
  ingredientsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
