import { protectedProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
	health: publicProcedure.query(() => ({ ok: true })),
	me: protectedProcedure.query(({ ctx }) => ctx.session.user),
});

export type AppRouter = typeof appRouter;
