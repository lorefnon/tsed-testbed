import { Controller } from "@tsed/di";
import { Get, Property, Required, Returns } from "@tsed/schema";
import { FoodCombo } from "../../entities/FoodCombo";
import { FoodComboRepo } from "../../repositories/FoodComboRepo";

class FoodComboListPayload {
  @Property(FoodCombo)
  @Required()
  entities: FoodCombo[]
}

@Controller("/food-combos")
export class FoodComboController {
  constructor(
    private foodComboRepo: FoodComboRepo
  ) {}

  /** Find all food combos which were explicitly named */
  @Get("/named")
  @Returns(200, FoodComboListPayload)
  async findAllNamed(): Promise<FoodComboListPayload> {
    const entities = await this.foodComboRepo.findAllNamed()
    return { entities }
  }
}
