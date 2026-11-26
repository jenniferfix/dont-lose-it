import { z } from "zod";
import { containerDescriptionZ, containerNameZ } from "./container";

export const newContainerZ = z.object({
	name: containerNameZ,
	description: containerDescriptionZ,
});
export type NewContainer = z.infer<typeof newContainerZ>;
