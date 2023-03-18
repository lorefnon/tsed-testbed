/**
 * DO NOT EDIT:
 *
 * This file has been auto-generated from database schema using ts-sql-codegen.
 * Any changes will be overwritten.
 */
import { Table } from "ts-sql-query/Table";
import type { DBConnection } from "../DBConnection";
import {
    InsertableRow,
    UpdatableRow,
    SelectedRow,
    InsertableValues,
    UpdatableValues,
    SelectedValues,
} from "ts-sql-query/extras/types"
import { extractColumnsFrom } from "ts-sql-query/extras/utils"

export class FoodItemTable extends Table<DBConnection, 'FoodItemTable'> {
    id = this.primaryKey('id', 'int');
    name = this.column('name', 'string');
    description = this.optionalColumn('description', 'string');

    constructor() {
        super('food_item')
    }
}

export const tFoodItem = new FoodItemTable();

export type FoodItemIRow = InsertableRow<FoodItemTable>;
export type FoodItemURow = UpdatableRow<FoodItemTable>;
export type FoodItemSRow = SelectedRow<FoodItemTable>;
export type InsertableFoodItem = InsertableValues<FoodItemTable>;
export type UpdatableFoodItem = UpdatableValues<FoodItemTable>;
export type FoodItem = SelectedValues<FoodItemTable>;
export const tFoodItemCols = extractColumnsFrom(tFoodItem);
