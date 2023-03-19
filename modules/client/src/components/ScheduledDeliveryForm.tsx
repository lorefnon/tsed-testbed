import { useCallback, useMemo, useState } from "react";
import { addDays, endOfDay } from "date-fns";
import DatePicker from "./DatePicker";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { ScheduledDelivery } from "../api/client";
import FoodComboSelectionList from "./FoodComboSelectionList";
import FoodComboBuilderForm from "./FoodComboBuilderForm";
import FoodComboItemList from "./FoodComboItemList";
import {
  ScheduledDeliveryUpsertInput,
  useScheduledDeliveries,
} from "../stores/scheduled-deliveries";
import { useAlerts } from "../stores/alerts";
import { useDeliveryIdParam } from "../utils/query-param-hooks";
import { useNamedFoodCombo } from "../stores/food-combos";

/** Presents form for creating/updating a scheduled delivery */
export default function ScheduledDeliveryForm(props: {
  delivery?: ScheduledDelivery | null;
}) {
  const [formState, setFormState] = useState<ScheduledDeliveryUpsertInput>(
    props.delivery ?? {
      arrivalTime: +addDays(new Date(), 1),
    }
  );
  const { appendError } = useAlerts();
  const { upsertDelivery } = useScheduledDeliveries();
  const [, setDeliveryId] = useDeliveryIdParam();

  const isCreating = !formState.id;
  const isCreatingCombo = !formState.foodCombo?.id;

  const { foodCombo } = useNamedFoodCombo({
    id: formState?.foodCombo?.id,
  });

  const handleSubmit = useCallback(() => {
    if (!formState.arrivalTime) {
      appendError("Date is mandatory");
    }
    upsertDelivery(formState).then((delivery) => {
      setDeliveryId(delivery.id);
      setFormState(delivery!);
    });
  }, [formState]);

  const cloneCombo = useCallback(() => {
    const comboId = formState?.foodCombo?.id;
    if (!comboId) return;
    setFormState((prev) => ({
      ...prev,
      foodCombo: {
        name: `${formState.foodCombo?.name ?? "Food Combo"} Copy`,
        items: formState.foodCombo?.items ?? foodCombo?.items ?? [],
      },
    }));
  }, [formState, foodCombo]);

  const currentArrivalTime = useMemo(() => {
    return formState?.arrivalTime ? new Date(formState.arrivalTime) : null;
  }, [formState?.arrivalTime]);

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
          value={currentArrivalTime}
          showTime={timeConfig}
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
          value={props.delivery?.foodCombo?.id}
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

const timeConfig = { format: "HH:mm" };
