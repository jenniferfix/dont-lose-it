import { z } from "zod";
import { pointZ, sizeZ } from "./generic";

export const shapeAttrsZ = z.object({
	position: pointZ,
	size: sizeZ,
});
export type ShapeAttrs = z.output<typeof shapeAttrsZ>;
