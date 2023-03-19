import { useMemo, useState } from "react";
import { FoodCombo, FoodItem } from "../api/client";
import Input from "antd/es/input";
import Form from "antd/es/form";
import Button from "antd/es/button";
import Card from "antd/es/card";
import CloseOutlinedIcon from "@ant-design/icons/CloseOutlined";
import PlusOutlinedIcon from "@ant-design/icons/PlusOutlined";
import TextArea from "antd/es/input/TextArea";

export default function FoodComboBuilderForm(p: {
  combo: FoodCombo;
  onChange: (combo: FoodCombo) => void;
}) {
  const [newItem, setNewItem] = useState<FoodItem | null>(
    (p.combo.items?.length ?? 0) === 0 ? {} : null
  );
  const items = useMemo(() => {
    if (!newItem) return p.combo.items ?? [];
    return (p.combo.items ?? []).concat(newItem);
  }, [p.combo, newItem]);

  const updateAt = (index: number, update: (item: FoodItem) => FoodItem) => ({
    ...p.combo,
    items: items.map((item, curIdx) => {
      if (curIdx !== index) return item;
      return update(item);
    }),
  });

  return (
    <Card title="New Food Combination" bordered style={{ margin: "5px" }}>
      <Form.Item
        label="Name"
        help="Naming combinations helps you quickly them in future deliveries"
      >
        <Input
          value={p.combo.name}
          onChange={(e) => {
            p.onChange({ ...p.combo, name: e.target.value });
          }}
        />
      </Form.Item>
      <br />
      <header
        style={{
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        Food Items:
      </header>
      <ul style={{ listStyle: "none", padding: "0 5px" }}>
        {items.map((item, idx) => {
          return (
            <li
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px 0",
                position: "relative",
              }}
            >
              <Button
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  padding: "5px",
                  border: "none",
                }}
                onClick={() => {
                  if (newItem) setNewItem(null);
                  p.onChange({
                    ...p.combo,
                    items: items.slice(0, idx).concat(items.slice(idx + 1)),
                  });
                }}
              >
                <CloseOutlinedIcon />
              </Button>

              <Form.Item label="Dish Name" required>
                <Input
                  required
                  placeholder="Eg. Malai Kofta"
                  value={item.name ?? ""}
                  onChange={(e) => {
                    const name = e.target.value;
                    if (newItem) setNewItem(null);
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
                <TextArea
                  rows={5}
                  value={item.description ?? ""}
                  placeholder="Additional details about this dish"
                  onChange={(e) => {
                    const description = e.target.value;
                    if (newItem) setNewItem(null);
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
              setNewItem({});
            }}
            disabled={!!newItem}
          >
            <PlusOutlinedIcon /> Add another item
          </Button>
        </li>
      </ul>
    </Card>
  );
}
