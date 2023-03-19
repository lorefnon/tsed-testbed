import { atom, useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import {
    ScheduledDelivery,
    ScheduledDeliveryControllerService,
} from "../api/client";
import { SyncState } from "../utils/types";
import { ensureId, ensureNotNil } from "../utils/invariants";
import { useAlerts } from "./alerts";


export const scheduledDeliveriesAtom = atom<{
    byId: Record<string, ScheduledDelivery | undefined>,
    byDate: Record<string, { syncState: SyncState, ids: number[] } | undefined>
}>({
    byId: {},
    byDate: {}
});

export const useScheduledDeliveries = () => {
    const [scheduledDeliveries, setScheduledDeliveries] = useAtom(
        scheduledDeliveriesAtom
    );
    const { appendAlert, appendError } = useAlerts()

    const createDelivery = async (entity: ScheduledDelivery) => {
        try {
            const resp =
                await ScheduledDeliveryControllerService.upsertOne({
                    entity,
                });
            const delivery = ensureNotNil(resp.entity)
            const deliveryId = ensureId(delivery)
            if (delivery?.arrivalTime) {
                setScheduledDeliveries((prev) => {
                    return {
                        ...prev,
                        byId: {
                            ...prev.byId,
                            [deliveryId]: delivery
                        }
                    };
                });
            }
            appendAlert({ type: 'success', message: 'Scheduled new delivery' })
            return delivery;
        } catch (e) {
            appendError(e)
        }
    };

    return {
        createDelivery,
        ...scheduledDeliveries,
    };
};

export const useScheduledDeliveriesForDate = (opts: {
    date: string;
    autoFetch?: boolean;
}) => {
    const { appendError } = useAlerts()

    const dateKey = opts.date;
    if (!dateKey.match(/\d{4}-\d{2}-\d{2}/)) {
        throw new Error("Invalid date key provided");
    }

    const [scheduledDeliveries, setScheduledDeliveries] = useAtom(
        scheduledDeliveriesAtom
    );

    const loadDeliveries = async () => {
        try {
            const resp = await ScheduledDeliveryControllerService.findByDate(
                dateKey
            );
            if (!resp.entities) return
            setScheduledDeliveries((prev) => {
                const next = { ...prev, byId: { ...prev.byId }, byDate: { ...prev.byDate } }
                next.byDate[dateKey] = { syncState: 'synced', ids: [] }
                for (const entity of resp.entities ?? []) {
                    const id = ensureId(entity)
                    next.byId[id] = entity
                    next.byDate[dateKey]!.ids.push(id)
                }
                return next
            });
        } catch (e) {
            appendError(e)
        }
    };

    useEffect(() => {
        if (opts.autoFetch === false) return;
        loadDeliveries();
    }, [dateKey]);

    const entities = useMemo(() => {
        const ids = scheduledDeliveries.byDate[opts.date]?.ids ?? []
        return ids.map(id => ensureNotNil(scheduledDeliveries.byId[id]))
    }, [scheduledDeliveries, opts.date])

    const syncState = scheduledDeliveries.byDate[opts.date]?.syncState ?? 'pending'

    return {
        loadDeliveries,
        entities,
        syncState
    };
};
