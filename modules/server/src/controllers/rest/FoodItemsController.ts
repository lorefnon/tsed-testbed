import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Property, Put, Returns } from "@tsed/schema";
import { FoodItem } from "src/entities/FoodItem";
import { FoodItemRepo } from "src/repositories/FoodItemRepo";
import { WithId } from "src/utils/types";

class FoodItemPayload {
  @Property()
  entity: FoodItem;
}

class FoodItemListPayload {
  @Property(FoodItem)
  entities: FoodItem[]
}

@Controller("/")
export class FoodItemsController {
  constructor(private foodItemRepo: FoodItemRepo) {}

  @Put("/food-items")
  @Returns(200, FoodItemPayload)
  async upsertOne(@BodyParams() { entity }: FoodItemPayload): Promise<FoodItemPayload> {
    if (entity.id) {
      await this.foodItemRepo.replaceOne(
        entity as WithId<FoodItem>
      );
      return { entity };
    } else {
      await this.foodItemRepo.insertOne(entity);
      return { entity };
    }
  }

  @Get("/food-combos/:foodComboId/items")
  @Returns(200, FoodItemListPayload)
  async findByCombo(@PathParams("foodComboId") foodComboId: number) {
    const entities = await this.foodItemRepo.findByComboId(foodComboId);
    return { entities };
  }
}
