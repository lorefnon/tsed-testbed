import { Description, Example, Property } from "@tsed/schema";
import { FoodItem, PersistedFoodItem } from "./FoodItem";
import { WithId } from "src/utils/types";

export class FoodCombo {
  @Property()
  id?: number

  @Description("Description of food combination")
  @Example("Authentic chinese")
  @Property()
  name?: string

  @Property(FoodItem)
  items?: FoodItem[]
}

export type PersistedFoodCombo = WithId<FoodCombo> & {
  items?: PersistedFoodItem[]
}
