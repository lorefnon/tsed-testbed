import { Property } from "@tsed/schema";
import { FoodCombo, PersistedFoodCombo } from "./FoodCombo";
import { WithId } from "src/utils/types";

export class ScheduledDelivery {
  @Property()
  id?: number
 
  @Property()
  foodCombo: FoodCombo

  @Property()
  arrivalTime: number
}

export type PersistedScheduledDelivery = WithId<ScheduledDelivery> & {
  foodCombo: PersistedFoodCombo
}
