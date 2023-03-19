import { Injectable } from "@tsed/di";
import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import {
  FoodItemSRow,
  tFoodItem,
  tFoodItemCols,
} from "src/datasources/generated/FoodItemTable";
import { FoodItem } from "src/entities/FoodItem";
import { BaseRepo } from "./BaseRepo";
import { WithId } from "src/utils/types";
import { tFoodComboItem } from "src/datasources/generated/FoodComboItemTable";

@Injectable()
export class FoodItemRepo extends BaseRepo {
  constructor(connectionProvider: ConnectionProvider) {
    super(connectionProvider);
  }

  async findByComboId(comboId: number, conn = this.getConnection()) {
    const rows = await conn
      .selectFrom(tFoodItem)
      .join(tFoodComboItem)
      .on(tFoodComboItem.foodItemId.equals(tFoodItem.id))
      .where(tFoodComboItem.foodComboId.equals(comboId))
      .select(tFoodItemCols)
      .executeSelectMany();
    return rows.map((row) => this.mapToFoodItemEntity(row));
  }

  async insertOne(entity: FoodItem, conn = this.getConnection()) {
    await this.insertMany([entity], conn);
    return entity;
  }

  async insertMany(entities: FoodItem[], conn = this.getConnection()) {
    const returned = await conn
      .insertInto(tFoodItem)
      .values(entities)
      .returning({
        id: tFoodItem.id,
      })
      .executeInsertMany();
    entities.forEach((entity, index) => {
      entity.id = returned[index].id;
    });
    return entities;
  }

  async replaceOne(entity: WithId<FoodItem>, conn = this.getConnection()) {
    await conn
      .update(tFoodItem)
      .set(entity)
      .where(tFoodItem.id.equals(entity.id))
      .executeUpdate();
  }

  mapToFoodItemEntity(row: FoodItemSRow) {
    const entity = new FoodItem();
    entity.id = row.id;
    entity.name = row.name;
    entity.description = row.description;
    return entity;
  }
}
