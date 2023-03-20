import { Property, Required } from "@tsed/schema";
import { FoodCombo, PersistedFoodCombo } from "./FoodCombo";
import { WithId } from "../utils/types";

export class ScheduledDelivery {
  @Property()
  id?: number

  @Required()
  @Property()
  foodCombo: FoodCombo

  @Required()
  @Property()
  arrivalTime: number
}

export type PersistedScheduledDelivery = WithId<ScheduledDelivery> & {
  foodCombo: PersistedFoodCombo
}
