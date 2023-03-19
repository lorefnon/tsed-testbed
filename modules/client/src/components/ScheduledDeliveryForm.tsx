import { FormEvent, useState } from "react";
import { addDays, endOfDay } from "date-fns";
import DatePicker from "./DatePicker";
import { Button, Form } from "antd";
import { ScheduledDelivery } from "../api/client";
import FoodComboSelectionList from "./FoodComboSelectionList";
import FoodComboBuilderForm from "./FoodComboBuilderForm";
import FoodComboItemList from "./FoodComboItemList";
import { ScheduledDeliveryUpsertInput, useScheduledDeliveries } from "../stores/scheduled-deliveries";
import { useAlerts } from "../stores/alerts";
import { NumberParam, useQueryParam } from "use-query-params";


export default function ScheduledDeliveryForm(p: {
  delivery?: ScheduledDelivery | null;
}) {
  const [formState, setFormState] = useState<ScheduledDeliveryUpsertInput>(
    p.delivery ?? {
      arrivalTime: +addDays(new Date(), 1),
    }
  );
  const { appendError } = useAlerts();
  const { upsertDelivery } = useScheduledDeliveries();
  const [, setScheduleId] = useQueryParam("scheduleId", NumberParam);

  const isCreating = !formState.id;
  const isCreatingCombo = !formState.foodCombo?.id;

  const handleSubmit = (e: FormEvent) => {
    if (!formState.arrivalTime) {
      appendError("Date is mandatory");
    }
    upsertDelivery(formState).then((delivery) => {
      setScheduleId(delivery.id);
      setFormState(delivery!);
    });
  };

  const cloneCombo = () => {
    const comboId = formState?.foodCombo?.id;
    if (!comboId) return;
    setFormState((prev) => ({
      ...prev,
      foodCombo: {
        name: `${formState.foodCombo?.name ?? "Food Combo"} Copy`,
        items: formState.foodCombo?.items,
      },
    }));
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      style={{ margin: "10px 20px" }}
    >
      <h1>
        {isCreating ? "New Food Truck Delivery" : "Update Food Truck Delivery"}
      </h1>
      <Form.Item label="Delivery Date" required>
        <DatePicker
          value={
            formState?.arrivalTime ? new Date(formState.arrivalTime) : null
          }
          showTime={{ format: "HH:mm" }}
          onChange={(date) => {
            if (!date) return;
            setFormState((prev) => ({
              ...prev,
              arrivalTime: +date,
            }));
          }}
          disabledDate={pastDayPredicate}
        />
      </Form.Item>
      <Form.Item
        label="Food combo"
        help="You can create a new combination or use a previously saved combination"
      >
        <FoodComboSelectionList
          value={p.delivery?.foodCombo?.id}
          onSelectNew={() => {
            setFormState((prev) => ({
              ...prev,
              foodCombo: {
                items: [],
              },
            }));
          }}
          onSelect={(id) => {
            if (id) {
              setFormState((prev) => ({
                ...prev,
                foodCombo: {
                  id,
                },
              }));
            }
          }}
        />
      </Form.Item>
      {isCreatingCombo ? (
        <FoodComboBuilderForm
          combo={formState.foodCombo ?? {}}
          onChange={({ id, ...foodCombo }) => {
            setFormState((prev) => ({
              ...prev,
              foodCombo,
            }));
          }}
        />
      ) : formState.foodCombo ? (
        <>
          <FoodComboItemList foodCombo={formState.foodCombo} />
          <Form.Item>
            <Button onClick={cloneCombo}>Clone</Button>
          </Form.Item>
        </>
      ) : null}
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

const pastDayPredicate = (current: Date) => {
  return current && current < endOfDay(new Date());
};
