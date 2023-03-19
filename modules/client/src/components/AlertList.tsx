import Alert from "antd/es/alert";
import { useAlerts } from "../stores/alerts";

/**
 * Utility component to show list of alerts (notifications & error messages)
 */
export default function AlertList() {
  const { alerts, dismiss } = useAlerts();

  return (
    <>
      {alerts.map((alert) => {
        return (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={() => dismiss(alert.id)}
            showIcon
            closable
            style={{
              margin: '10px'
            }}
          />
        );
      })}
    </>
  );
}
