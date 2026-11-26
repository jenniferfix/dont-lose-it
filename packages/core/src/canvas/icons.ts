import { z } from "zod";

export const iconZ = z.object({
	code: z.string(),
	label: z.string(),
	filename: z.string(),
});

export type Icon = z.output<typeof iconZ>;
