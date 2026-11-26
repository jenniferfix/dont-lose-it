import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { auth } from "./auth";

export async function createContext(headers: Headers) {
	const session = await auth.api.getSession({ headers });
	return { session };
}

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create({
	transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
	return next({ ctx: { session: ctx.session } });
});
