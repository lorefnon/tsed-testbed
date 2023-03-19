import { useEffect } from "react";
import { FoodCombo } from "../api/client";
import { useFoodCombos } from "../stores/food-combos";

export default function FoodComboItemList(p: { foodCombo: FoodCombo }) {
  const { loadItems } = useFoodCombos();

  useEffect(() => {
    if (!p.foodCombo.items && p.foodCombo.id) {
      loadItems(p.foodCombo.id);
    }
  }, [p.foodCombo]);

  return (
    <ul>
      {p.foodCombo.items?.map((item, index) => (
        <li key={item.id}>
          <div style={{ fontWeight: "bold" }}>{item.name}</div>
          <div>{item.description}</div>
        </li>
      ))}
    </ul>
  );
}
