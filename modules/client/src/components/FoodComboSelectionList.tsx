import Select from "antd/es/select";
import { useMemo } from "react";
import { useNamedFoodCombos } from "../stores/food-combos";

/**
 * Presents options for selecting between any of the previously saved food combinations
 * or creating a new one
 */
export default function FoodComboSelectionList(props: {
  value?: number | null;
  onSelectNew?: () => void;
  onSelect?: (value: number | null) => void;
}) {
  const foodCombos = useNamedFoodCombos();

  // Restructure item list to the shape expected by select dropdown component
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
      value={props.value}
      onChange={(value) => {
        if (value === -1) props.onSelectNew?.();
        else props.onSelect?.(value);
      }}
    />
  );
}
