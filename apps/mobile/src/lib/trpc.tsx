import type { AppRouter } from "@dont-lose-it/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState, type ReactNode } from "react";
import superjson from "superjson";

import { API_URL } from "./api-url";
import { authClient } from "./auth-client";

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();

export function ApiProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${API_URL}/trpc`,
					transformer: superjson,
					async headers() {
						const cookie = await authClient.getCookie();
						return cookie ? { Cookie: cookie } : {};
					},
					fetch: (url, options) => fetch(url, { ...options, credentials: "omit" }),
				}),
			],
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{children}
			</TRPCProvider>
		</QueryClientProvider>
	);
}
