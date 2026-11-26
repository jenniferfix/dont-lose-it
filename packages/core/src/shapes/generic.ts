import { z } from "zod";

export const number = z.number();

export const pointZ = z.object({
	x: number,
	y: number,
});
export type Point = z.infer<typeof pointZ>;

export const sizeZ = z.object({
	width: number,
	height: number,
});
export type Size = z.infer<typeof sizeZ>;
