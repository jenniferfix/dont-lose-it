import { expo } from "@better-auth/expo";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db, schema } from "@dont-lose-it/db";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg", schema }),
	emailAndPassword: { enabled: true },
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [expo()],
	trustedOrigins: [
		"dontloseit://",
		...(process.env.NODE_ENV !== "production" ? ["exp://", "exp://**"] : []),
	],
});
