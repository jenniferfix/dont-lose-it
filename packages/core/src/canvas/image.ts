import { z } from "zod";

export const imageArray = ["plastic-box"] as const;
export const imageEnumZ = z.enum(imageArray);
export type ImageEnum = z.infer<typeof imageEnumZ>;

export const imageZ = z.object({
	code: z.string(),
	label: z.string(),
	filename: z.string(),
	width: z.number(),
	height: z.number(),
});
export type Image = z.infer<typeof imageZ>;

export const imagesZ = z.record(imageEnumZ, imageZ);
export type Images = z.infer<typeof imagesZ>;

export const images = {
	"plastic-box": {
		code: "plastic-box",
		label: "Plastic box",
		filename: "plastic-box-300x224.png",
		width: 300,
		height: 224,
	},
} satisfies Images;
