import {
	createStore,
	createStoreContext,
	type Store,
	type StoreActionsFactory,
	useSelector,
} from "@tanstack/react-store";
import type { Size, Point, StageState, StageActions } from "@dont-lose-it/core";

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

export const createStoreActions: StoreActionsFactory<StageState, StageActions> = ({
	setState,
	// get,
}) => ({
	setSize: (size) =>
		setState((prev) => ({
			...prev,
			size,
		})),
	setPosition: (position) =>
		setState((prev) => ({
			...prev,
			position,
		})),
	setScale: (scale) =>
		setState((prev) => ({
			...prev,
			scale,
		})),
	setScaleAndPosition: ({ scale, position }) =>
		setState((prev) => ({
			...prev,
			position,
			scale,
		})),
	setContextMenuPosition: (menuPosition) =>
		setState((prev) => ({
			...prev,
			contextMenuPosition: menuPosition,
		})),
	setShowNewContainerDialog: (showNewContainerDialog) =>
		setState((prev) => ({
			...prev,
			showNewContainerDialog,
		})),
	setShowNewItemDialog: (showNewItemDialog) =>
		setState((prev) => ({
			...prev,
			showNewItemDialog,
		})),
	hideContextMenu: () =>
		setState((prev) => ({
			...prev,
			contextMenuPosition: null,
		})),
	// log: () => console.log(get()),
});

export const stageStore = createStore(initialStageState, ({ setState, get }) => ({
	setSize: (size: Size) =>
		setState((prev) => ({
			...prev,
			size,
		})),
	setPosition: (position: Point) =>
		setState((prev) => ({
			...prev,
			position,
		})),
	setScale: (scale: number) =>
		setState((prev) => ({
			...prev,
			scale,
		})),
	setScaleAndPosition: ({ scale, position }: { scale: number; position: Point }) =>
		setState((prev) => ({
			...prev,
			position,
			scale,
		})),
	setContextMenuPosition: (menuPosition: Point | null) =>
		setState((prev) => ({
			...prev,
			contextMenuPosition: menuPosition,
		})),
	setShowNewContainer: (showNewContainerDialog: boolean) =>
		setState((prev) => ({
			...prev,
			showNewContainerDialog,
		})),
	setShowNewItem: (showNewItemDialog: boolean) =>
		setState((prev) => ({
			...prev,
			showNewItemDialog,
		})),
	hideContextMenu: () =>
		setState((prev) => ({
			...prev,
			contextMenuPosition: null,
		})),
	log: () => console.log(get()),
}));

export type StageStore = Store<StageState, StageActions>;

export type StoreContextValue = {
	stageStore: StageStore;
};

export const { StoreProvider: StageStoreProvider, useStoreContext: useStageStoreContext } =
	createStoreContext<StoreContextValue>();

export function useStageState<T>(selector: (state: StageState) => T): T {
	const { stageStore } = useStageStoreContext();
	return useSelector(stageStore, selector);
}

export function useStageActions(): StageActions {
	return useStageStoreContext().stageStore.actions;
}
