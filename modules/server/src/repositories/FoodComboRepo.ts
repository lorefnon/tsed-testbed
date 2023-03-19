import { Injectable } from "@tsed/di";
import { BaseRepo } from "./BaseRepo";
import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import { FoodCombo } from "src/entities/FoodCombo";
import { tFoodComboItem } from "src/datasources/generated/FoodComboItemTable";
import { FoodItemRepo } from "./FoodItemRepo";
import { DBConnection } from "src/datasources/DBConnection";
import {
  FoodComboSRow,
  tFoodCombo,
  tFoodComboCols,
} from "src/datasources/generated/FoodComboTable";

@Injectable()
export class FoodComboRepo extends BaseRepo {
  constructor(
    connectionProvider: ConnectionProvider,
    private foodItemRepo: FoodItemRepo
  ) {
    super(connectionProvider);
  }

  async findAllNamed(conn = this.getConnection()) {
    const rows = await conn
      .selectFrom(tFoodCombo)
      .where(tFoodCombo.name.isNotNull())
      .select(tFoodComboCols)
      .executeSelectMany();
    return rows.map((row) => this.mapToFoodComboEntity(row));
  }

  mapToFoodComboEntity(row: FoodComboSRow) {
    const foodCombo = new FoodCombo();
    foodCombo.id = row.id;
    foodCombo.name = row.name;
    return foodCombo;
  }

  async insertOne(entity: FoodCombo, conn?: DBConnection) {
    const inserted = await this.insertMany([entity], conn);
    return inserted[0];
  }

  async insertMany(entities: FoodCombo[], conn?: DBConnection) {
    return this.ensureTransaction(conn, async (conn) => {
      const returned = await conn
        .insertInto(tFoodCombo)
        .values(entities)
        .returning({
          id: tFoodCombo.id,
        })
        .executeInsertMany();
      entities = this.applyIds(returned, entities);
      const items = entities.flatMap((entity) => entity.items ?? []);
      if (items.length > 0) {
        await this.foodItemRepo.insertMany(items, conn);
        await this.associateItems(entities);
      }
      return entities;
    });
  }

  async associateItems(entities: FoodCombo[], conn = this.getConnection()) {
    await conn
      .insertInto(tFoodComboItem)
      .values(
        entities.flatMap(
          (entity) =>
            entity.items?.map((item) => ({
              foodItemId: item.id!,
              foodComboId: entity.id!,
            })) ?? []
        )
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
