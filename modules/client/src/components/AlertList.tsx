import Alert from "antd/es/alert";
import { useAlerts } from "../stores/alerts";

export default function AlertList() {
  const { alerts, dismiss } = useAlerts();

  return (
    <>
      {alerts.map((alert) => {
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => dismiss(alert.id)}
        />;
      })}
    </>
  );
}
