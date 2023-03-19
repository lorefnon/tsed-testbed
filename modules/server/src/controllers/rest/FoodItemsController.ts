import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Property, Put, Returns } from "@tsed/schema";
import { FoodItem } from "src/entities/FoodItem";
import { FoodItemRepo } from "src/repositories/FoodItemRepo";

class FoodItemPayload {
  @Property()
  entity: FoodItem
}

@Controller("/food-items")
export class FoodItemsController {
  constructor(
    private foodItemRepo: FoodItemRepo
  ) {}

  @Put("/")
  @Returns(200, FoodItemPayload)
  async createOne(@BodyParams() body: FoodItemPayload) {

    if (body.entity.id) {

    }
    const inserted = await this.foodItemRepo.insertOne(body.entity)
    return { entity: inserted }
  }
}
