import { Description, Example, Property } from "@tsed/schema"

export class FoodItem {
  @Property()
  id?: number 

  @Description("Name of food item")
  @Example("Gobi Manchurian")
  @Property()
  name: string

  @Property()
  description: string
}
