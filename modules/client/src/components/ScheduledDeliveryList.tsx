import { ScheduledDelivery } from "../api/client";
import { format } from "date-fns";
import { useScheduledDeliveriesForDate } from "../stores/scheduled-delivery";

export default function ScheduledDeliveryList() {
  const { entities: deliveries } = useScheduledDeliveriesForDate({
    date: format(new Date(), "yyyy-MM-dd"),
  });

  return (
    <div>
      Deliveries scheduled: {deliveries?.length || "None"}
      <ul>
        {deliveries?.map((delivery) => (
          <ScheduledDeliveryListItem {...{ delivery }} />
        ))}
      </ul>
    </div>
  );
}

export function ScheduledDeliveryListItem(p: { delivery: ScheduledDelivery }) {
  if (!p.delivery.foodCombo) return null;
  return (
    <div>
      Expected to arrive at: {p.delivery.arrivalTime}
      Combo: {p.delivery.foodCombo.name}
      Items:
      <ul>
        {p.delivery.foodCombo.items?.map((item) => (
          <li>
            {item.name}
            {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
