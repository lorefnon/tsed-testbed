import { Controller } from "@tsed/di";
import { Get, Property, Returns } from "@tsed/schema";
import { FoodCombo } from "src/entities/FoodCombo";
import { FoodComboRepo } from "src/repositories/FoodComboRepo";

class FoodComboListPayload {
  @Property(FoodCombo)
  entities: FoodCombo[]
}

@Controller("/food-combos")
export class FoodComboController {
  constructor(
    private foodComboRepo: FoodComboRepo
  ) {}

  @Get("/named")
  @Returns(200, FoodComboListPayload)
  async findAllNamed(): Promise<FoodComboListPayload> {
    const entities = await this.foodComboRepo.findAllNamed()
    return { entities }
  }
}
