import { z } from "zod";

export const containerIdZ = z.string().min(1, { error: "Container ID cannot be empty" });
export const containerNameZ = z.string().min(1, { error: "Name cannot be empty" });
export const containerDescriptionZ = z.string();
