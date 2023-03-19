import { Injectable } from "@tsed/di";
import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import { tFoodItem } from "src/datasources/generated/FoodItemTable";
import { FoodItem } from "src/entities/FoodItem";
import { BaseRepo } from "./BaseRepo";

@Injectable()
export class FoodItemRepo extends BaseRepo {
  constructor(connectionProvider: ConnectionProvider) {
    super(connectionProvider);
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

  async replaceOne(entity: FoodItem & { id: string }, conn = this.getConnection()) {
    await conn
      .update(tFoodItem)
      .set(entity)
      .where(tFoodItem.id.equals(entity.id))
      .executeUpdate();
  }
}
