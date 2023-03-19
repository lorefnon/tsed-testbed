import { Description, Example, Property } from "@tsed/schema"
import { WithId } from "src/utils/types"

export class FoodItem {
  @Property()
  id?: number 

  @Description("Name of food item")
  @Example("Gobi Manchurian")
  @Property()
  name: string

  @Property()
  description?: string
}

export type PersistedFoodItem = WithId<FoodItem>
