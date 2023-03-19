import { ScheduledDelivery } from "../api/client";
import format from "date-fns/esm/format";
import { useScheduledDeliveriesForDate } from "../stores/scheduled-deliveries";
import LoaderSection from "./LoaderSection";
import Alert from "antd/es/alert";
import Card from "antd/es/card";
import Button from "antd/es/button";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import DatePicker from "./DatePicker";
import { useMemo, useState } from "react";

export default function ScheduledDeliveryList() {
  const [date, setDate] = useState<Date>(new Date());

  const dateStr = useMemo(() => {
    return format(date, "yyyy-MM-dd");
  }, [date]);

  const { entities: deliveries, syncState } = useScheduledDeliveriesForDate({
    date: dateStr,
  });

  if (syncState === "pending") {
    return <LoaderSection />;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DatePicker
          value={date}
          onChange={(next) => {
            if (next) setDate(next);
          }}
          style={{
            margin: "0 0 0 10px",
          }}
        />
        <Alert
          type="info"
          message={`Deliveries scheduled: ${deliveries?.length || "None"}`}
          showIcon
          style={{
            margin: "0 10px",
            flexGrow: 1
          }}
        />
      </div>
      <ul style={{ paddingInlineStart: 0, listStyle: "none" }}>
        {deliveries?.map((delivery) => (
          <li key={delivery.id}>
            <ScheduledDeliveryListItem {...{ delivery }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScheduledDeliveryListItem(p: { delivery: ScheduledDelivery }) {
  if (!p.delivery.foodCombo) return null;
  const [, setScheduleId] = useQueryParam("scheduleId", NumberParam);
  const [, setTabKey] = useQueryParam("tab", StringParam);

  return (
    <Card
      title={getCardTitle(p.delivery)}
      style={{ margin: "10px", border: "1px solid #ddd" }}
    >
      <h2>Items</h2>
      <ul>
        {p.delivery.foodCombo.items?.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          setTabKey("manage");
          setScheduleId(p.delivery.id);
        }}
      >
        Edit Delivery
      </Button>
    </Card>
  );
}

const getCardTitle = (delivery: ScheduledDelivery) => {
  const parts: string[] = [];
  if (delivery.foodCombo?.name) {
    parts.push(delivery.foodCombo?.name);
  }
  if (delivery.arrivalTime) {
    parts.push(
      `Arriving at: ${format(delivery.arrivalTime, "MMM dd, yyyy HH:mm")}`
    );
  }
  return parts.join(", ") || "Scheduled Delivery";
};
