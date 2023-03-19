import { Input, Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { FoodCombo, FoodItem } from "../api/client";

export default function FoodComboBuilderForm(p: {
  combo: FoodCombo;
  onChange: (combo: FoodCombo) => void;
}) {
  const [newCombo, setNewCombo] = useState<FoodCombo | null>(
    (p.combo.items?.length ?? 0) === 0 ? {} : null
  );
  const items = useMemo(() => {
    if (!newCombo) return p.combo.items ?? [];
    return (p.combo.items ?? []).concat(newCombo);
  }, [p.combo, newCombo]);

  const updateAt = (index: number, update: (item: FoodItem) => FoodItem) => ({
    ...p.combo,
    items: items.map((item, curIdx) => {
      if (curIdx !== index) return item;
      return update(item);
    }),
  });

  return (
    <ul>
      {items.map((item, idx) => {
        return (
          <li key={item.id}>
            <Form.Item label="Dish Name">
              <Input
                onChange={(e) => {
                  const name = e.target.value;
                  if (newCombo) setNewCombo(null);
                  p.onChange(
                    updateAt(idx, (item) => ({
                      ...item,
                      name,
                    }))
                  );
                }}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                multiple
                onChange={(e) => {
                  const description = e.target.value;
                  if (newCombo) setNewCombo(null);
                  p.onChange(
                    updateAt(idx, (item) => ({
                      ...item,
                      description,
                    }))
                  );
                }}
              />
            </Form.Item>
          </li>
        );
      })}
      <li>
        <Button
          onClick={() => {
            setNewCombo({});
          }}
        >
          <PlusOutlined />
        </Button>
      </li>
    </ul>
  );
}
