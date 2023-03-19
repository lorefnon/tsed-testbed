import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import {
    FoodCombo,
    FoodComboControllerService,
    FoodItemsControllerService,
} from "../api/client";
import { SyncState } from "../utils/types";
import { useAlerts } from "./alerts";

export const foodCombosAtom = atom<{
    syncState: SyncState;
    entities: FoodCombo[];
}>({
    syncState: "pending",
    entities: [],
});

export const useFoodCombos = (opts?: { autoFetch?: boolean }) => {
    const [foodCombos, setFoodCombos] = useAtom(foodCombosAtom);
    const { appendError } = useAlerts()

    const loadFoodCombos = async () => {
        try {
            const { entities } = await FoodComboControllerService.findAllNamed();
            setFoodCombos({
                entities: entities ?? [],
                syncState: "synced",
            });
        } catch (e) {
            appendError(e)
        }
    };

    const loadItems = async (comboId: number) => {
        try {
            const { entities: items } =
                await FoodItemsControllerService.findByCombo(comboId);
            setFoodCombos((prev) => ({
                ...prev,
                entities: prev.entities.map((entity) =>
                    entity.id === comboId ? { ...entity, items } : entity
                ),
            }));
        } catch (e) {
            appendError(e)
        }
    };

    useEffect(() => {
        if (opts?.autoFetch === false) return;
        loadFoodCombos();
    }, []);

    return {
        ...foodCombos,
        loadFoodCombos,
        loadItems
    };
};
