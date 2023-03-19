import { Injectable } from "@tsed/di";
import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import {
  ScheduledDeliverySRow,
  tScheduledDelivery,
  tScheduledDeliveryCols,
} from "src/datasources/generated/ScheduledDeliveryTable";
import { ScheduledDelivery } from "src/entities/ScheduledDelivery";
import { BaseRepo } from "./BaseRepo";
import { startOfDay, endOfDay } from "date-fns";
import { tFoodComboItem } from "src/datasources/generated/FoodComboItemTable";
import {
  FoodComboSRow,
  tFoodCombo,
  tFoodComboCols,
} from "src/datasources/generated/FoodComboTable";
import {
  tFoodItem,
  tFoodItemCols,
} from "src/datasources/generated/FoodItemTable";
import { groupBy, compact } from "lodash";
import { FoodCombo } from "src/entities/FoodCombo";
import { FoodItemRepo } from "./FoodItemRepo";
import { FoodComboRepo } from "./FoodComboRepo";
import { DBConnection } from "src/datasources/DBConnection";

@Injectable()
export class ScheduledDeliveryRepo extends BaseRepo {
  constructor(
    connectionProvider: ConnectionProvider,
    private foodComboRepo: FoodComboRepo,
    private foodItemRepo: FoodItemRepo
  ) {
    super(connectionProvider);
  }

  async insertOne(entity: ScheduledDelivery, conn?: DBConnection) {
    const entities = await this.insertMany([entity], conn);
    return entities[0];
  }

  async updateOne(entity: ScheduledDelivery, conn?: DBConnection) {
    return this.ensureTransaction(conn, async (conn) => {
      await this.ensureFoodCombosPersisted([entity], conn);
      await conn
        .update(tScheduledDelivery)
        .set({
          arrivalTime: +entity.arrivalTime,
          foodComboId: entity.foodCombo.id!,
        })
        .where(tScheduledDelivery.id.equals(entity.id!))
        .executeUpdate();
    });
  }

  async insertMany(entities: ScheduledDelivery[], conn?: DBConnection) {
    return this.ensureTransaction(conn, async (conn) => {
      await this.ensureFoodCombosPersisted(entities);
      const returned = await conn
        .insertInto(tScheduledDelivery)
        .values(
          entities.map((entity) => ({
            id: entity.id,
            foodComboId: entity.foodCombo.id!,
            arrivalTime: +entity.arrivalTime,
          }))
        )
        .returning({
          id: tScheduledDelivery.id,
        })
        .executeInsertMany();
      return this.applyIds(returned, entities);
    });
  }

  async ensureFoodCombosPersisted(
    entities: ScheduledDelivery[],
    conn = this.getConnection()
  ) {
    const newFoodCombos = compact(
      entities.map((entity) => {
        if (entity.foodCombo.id) return null;
        else return entity.foodCombo;
      })
    );
    if (newFoodCombos.length > 0)
      await this.foodComboRepo.insertMany(newFoodCombos, conn);
  }

  async findByArrivalDate(date: Date, conn = this.getConnection()) {
    const sdfcRows = await conn
      .selectFrom(tScheduledDelivery)
      .join(tFoodCombo)
      .on(tScheduledDelivery.foodComboId.equals(tFoodCombo.id))
      .where(tScheduledDelivery.arrivalTime.greaterOrEquals(+startOfDay(date)))
      .and(tScheduledDelivery.arrivalTime.lessOrEquals(+endOfDay(date)))
      .select({
        ...tFoodComboCols,
        ...tScheduledDeliveryCols,
      })
      .executeSelectMany();
    const fcfiRows = await conn
      .selectFrom(tFoodCombo)
      .join(tFoodComboItem)
      .on(tFoodCombo.id.equals(tFoodComboItem.foodComboId))
      .join(tFoodItem)
      .on(tFoodComboItem.foodItemId.equals(tFoodItem.id))
      .where(tFoodCombo.id.in(sdfcRows.map((it) => it.foodComboId)))
      .select({
        foodComboId: tFoodCombo.id,
        ...tFoodItemCols,
      })
      .executeSelectMany();
    const foodItemsByComboId = groupBy(fcfiRows, "foodComboId");
    return sdfcRows.map((sdfcRow) => {
      const entity = this.mapToScheduledDeliveryEntity(sdfcRow);
      entity.foodCombo.items =
        foodItemsByComboId[sdfcRow.foodComboId]?.map((fcfiRow) =>
          this.foodItemRepo.mapToFoodItemEntity(fcfiRow)
        ) ?? [];
      return entity;
    });
  }

  mapToScheduledDeliveryEntity(row: ScheduledDeliverySRow & FoodComboSRow) {
    const entity = new ScheduledDelivery();
    entity.id = row.id;
    entity.arrivalTime = row.arrivalTime;
    entity.foodCombo = new FoodCombo();
    entity.foodCombo.id = row.foodComboId;
    entity.foodCombo.name = row.name;
    return entity;
  }
}
