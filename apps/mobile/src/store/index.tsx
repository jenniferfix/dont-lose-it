import { useCreateStore } from "@tanstack/react-store";
import { type PropsWithChildren, useMemo } from "react";
import { createStoreActions, initialStageState, StageStoreProvider } from "./stage";

export function StageProvider({ children }: PropsWithChildren) {
	const stageStore = useCreateStore(initialStageState, createStoreActions);
	const value = useMemo(() => ({ stageStore }), [stageStore]);
	return <StageStoreProvider value={value}>{children}</StageStoreProvider>;
}
