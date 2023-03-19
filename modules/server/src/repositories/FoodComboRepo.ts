import { Injectable } from "@tsed/di";
import { BaseRepo } from "./BaseRepo";
import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import { FoodItemCombo } from "src/entities/FoodItemCombo";
import { tFoodItem } from "src/datasources/generated/FoodItemTable";
import { tFoodComboItem } from "src/datasources/generated/FoodComboItemTable";
import { FoodItemRepo } from "./FoodItemRepo";
import { DBConnection } from "src/datasources/DBConnection";

@Injectable()
export class FoodComboRepo extends BaseRepo {
  constructor(
    connectionProvider: ConnectionProvider,
    private foodItemRepo: FoodItemRepo
  ) {
    super(connectionProvider);
  }

  async insertOne(entity: FoodItemCombo, conn?: DBConnection) {
    await this.ensureTransaction(conn, async (conn) => {
      const { id } = await conn
        .insertInto(tFoodItem)
        .set(entity)
        .returning({
          id: tFoodItem.id,
        })
        .executeInsertOne();
      entity.id = id;
      if (entity.items) {
        await this.foodItemRepo.insertMany(entity.items, conn);
        await this.addItems(id, entity.items.map(it => it.id!))
      }
    });
  }

  async addItems(
    foodComboId: number,
    foodItemIds: number[],
    conn = this.getConnection()
  ) {
    await conn
      .insertInto(tFoodComboItem)
      .values(
        foodItemIds.map((foodItemId) => ({
          foodComboId,
          foodItemId,
        }))
      )
      .onConflictDoNothing()
      .executeInsert();
  }

  async removeItems(
    foodComboId: number,
    foodItemIds: number[],
    conn = this.getConnection()
  ) {
    await conn
      .deleteFrom(tFoodComboItem)
      .where(tFoodComboItem.foodComboId.equals(foodComboId))
      .and(tFoodComboItem.foodItemId.in(foodItemIds))
      .executeDelete();
  }
}
