import { Select } from "antd";
import { useMemo } from "react";
import { useFoodCombos } from "../stores/food-combos";

export default function FoodComboSelectionList(p: {
  value?: number | null;
  onSelectNew?: () => void;
  onSelect?: (value: number | null) => void;
}) {
  const foodCombos = useFoodCombos();
  const selectOptions = useMemo(() => {
    return [
      {
        label: "New",
        value: -1,
      },
    ].concat(
      foodCombos.entities?.map((entity) => {
        return {
          label: entity.name!,
          value: entity.id!,
        };
      }) ?? []
    );
  }, [foodCombos.entities]);
  return (
    <Select
      options={selectOptions}
      value={p.value}
      onChange={(value) => {
        if (value === -1) p.onSelectNew?.();
        else p.onSelect?.(value);
      }}
    />
  );
}
