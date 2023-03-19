import { useEffect, useMemo } from "react";
import { FoodCombo } from "../api/client";
import { useNamedFoodCombo, useNamedFoodCombos } from "../stores/food-combos";

/**
 * Presents readonly list of items in food combo
 */
export default function FoodComboItemList(props: { foodCombo: FoodCombo }) {
  const { loadItems } = useNamedFoodCombos();
  const { foodCombo } = useNamedFoodCombo({
    id: props.foodCombo.id
  })

  useEffect(() => {
    if (!props.foodCombo.items && props.foodCombo.id) {
      loadItems(props.foodCombo.id);
    }
  }, [props.foodCombo]);

  const items = foodCombo?.items ?? props.foodCombo.items ?? [];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div style={{ fontWeight: "bold" }}>{item.name}</div>
          <div>{item.description}</div>
        </li>
      ))}
    </ul>
  );
}
