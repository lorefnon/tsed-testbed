import { atom, useAtom } from "jotai";

let nextId = 1;

interface AlertInfo {
    id: number;
    type: "success" | "warning" | "error" | "info";
    message: string;
}

type AlertInfoInput = Omit<AlertInfo, "id">

const alertsAtom = atom<AlertInfo[]>([]);

export const useAlerts = () => {
    const [alerts, setAlerts] = useAtom(alertsAtom);

    const appendAlert = (alert: AlertInfoInput) => {
        setAlerts((prev) => prev.concat({
            id: nextId++,
            ...alert
        }));
    };

    const appendError = (error: any) => {
        console.error(error)
        appendAlert(extractAlertFromError(error));
    };

    const dismiss = (id?: number) => {
        setAlerts(prev => id ? prev.filter(it => it.id !== id) : [])
    }

    return {
        alerts,
        appendAlert,
        dismiss,
        appendError,
    };
};

const extractAlertFromError = (error: any): AlertInfoInput => {
    let message = error?.body?.message ?? error?.message
    if (typeof message !== 'string') message = 'Something went wrong'
    return { type: "error", message };
};
