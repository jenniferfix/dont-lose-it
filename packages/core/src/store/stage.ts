import { z } from "zod";
import { type Point, pointZ, type Size, sizeZ } from "../shapes/generic";

export const stageStateZ = z.object({
	position: pointZ,
	size: sizeZ,
	scale: z.number(),
	contextMenuPosition: pointZ.nullable(),
	showNewContainerDialog: z.boolean(),
	showNewItemDialog: z.boolean(),
});
export type StageState = z.output<typeof stageStateZ>;

type SetScaleAndPosition = {
	scale: number;
	position: Point;
};

export type StageActions = {
	setSize: (size: Size) => void;
	setPosition: (position: Point) => void;
	setScale: (scale: number) => void;
	setScaleAndPosition: (values: SetScaleAndPosition) => void;
	setContextMenuPosition: (menuPosition: Point | null) => void;
	setShowNewContainerDialog: (showNewContainerDialog: boolean) => void;
	setShowNewItemDialog: (showNewItemDialog: boolean) => void;
	hideContextMenu: () => void;
};

export const initialStageState: StageState = {
	position: {
		x: 1,
		y: 1,
	},
	size: {
		width: 0,
		height: 0,
	},
	scale: 1,
	contextMenuPosition: null,
	showNewContainerDialog: false,
	showNewItemDialog: false,
};
