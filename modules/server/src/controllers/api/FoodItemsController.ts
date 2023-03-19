import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Property, Put, Returns } from "@tsed/schema";
import { FoodItem } from "../../entities/FoodItem";
import { FoodItemRepo } from "../../repositories/FoodItemRepo";
import { WithId } from "../../utils/types";

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

  /** Create or update a food item */
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

  /** Find a food combo by id */
  @Get("/food-combos/:foodComboId/items")
  @Returns(200, FoodItemListPayload)
  async findByCombo(@PathParams("foodComboId") foodComboId: number) {
    const entities = await this.foodItemRepo.findByComboId(foodComboId);
    return { entities };
  }
}
