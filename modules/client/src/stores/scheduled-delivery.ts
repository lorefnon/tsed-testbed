import { atom, useAtom } from "jotai";
import { format } from "date-fns";
import { useEffect } from "react";
import {
    ScheduledDelivery,
    ScheduledDeliveryControllerService,
} from "../api/client";
import { SyncState } from "../utils/types";

interface ScheduledDeliveriesState {
    syncState: SyncState;
    entities: ScheduledDelivery[];
}

export const scheduledDeliveriesAtom = atom<
    Record<string, ScheduledDeliveriesState | undefined>
>({});

const dateKeyFormat = "yyyy-MM-dd";

export const useScheduledDeliveries = () => {
    const [scheduledDeliveries, setScheduledDeliveries] = useAtom(
        scheduledDeliveriesAtom
    );

    const createDelivery = async (entity: ScheduledDelivery) => {
        const { entity: delivery } =
            await ScheduledDeliveryControllerService.upsertOne({
                entity,
            });
        if (delivery?.arrivalTime) {
            const dateKey = format(delivery.arrivalTime, dateKeyFormat);
            setScheduledDeliveries((prev) => {
                const prevEntities = prev[dateKey]?.entities;
                if (!prevEntities) return prev;
                return {
                    ...prev,
                    [dateKey]: prev[dateKey]
                        ? {
                              syncState: "synced",
                              ...prev[dateKey],
                              entities: prevEntities.concat(delivery),
                          }
                        : undefined,
                };
            });
        }
        return delivery;
    };

    return {
        createDelivery,
        scheduledDeliveries,
    };
};

export const useScheduledDeliveriesForDate = (opts: {
    date: string;
    autoFetch?: boolean;
}) => {
    const dateKey = opts.date;
    if (!dateKey.match(/\d{4}-\d{2}-\d{2}/)) {
        throw new Error("Invalid date key provided");
    }

    const [scheduledDeliveries, setScheduledDeliveries] = useAtom(
        scheduledDeliveriesAtom
    );

    const loadDeliveries = async () => {
        const resp = await ScheduledDeliveryControllerService.findByDate(
            dateKey
        );
        if (resp.entities)
            setScheduledDeliveries((prev) => ({
                ...prev,
                [dateKey]: {
                    syncState: "synced",
                    entities: resp.entities!,
                },
            }));
    };

    useEffect(() => {
        if (opts.autoFetch === false) return;
        loadDeliveries();
    }, [dateKey]);

    return {
        loadDeliveries,
        ...scheduledDeliveries[dateKey],
    };
};
