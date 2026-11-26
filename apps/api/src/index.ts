import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";

import { auth } from "./auth";
import { appRouter } from "./router";
import { createContext } from "./trpc";

const app = new Hono();

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, c) => createContext(c.req.raw.headers),
	}),
);

const port = Number(process.env.PORT ?? 3000);
serve({ fetch: app.fetch, port }, (info) => {
	console.log(`API listening on http://localhost:${info.port}`);
});
