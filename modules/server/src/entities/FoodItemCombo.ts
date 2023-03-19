import { Description, Example, Property } from "@tsed/schema";
import { FoodItem } from "./FoodItem";

export class FoodItemCombo {
  @Property()
  id?: number

  @Description("Description of food combination")
  @Example("Authentic chinese")
  @Property()
  name: string

  @Property()
  items?: FoodItem[]
}
