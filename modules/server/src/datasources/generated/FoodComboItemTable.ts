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

export class FoodComboItemTable extends Table<DBConnection, 'FoodComboItemTable'> {
    foodComboId = this.primaryKey('food_combo_id', 'int');
    foodItemId = this.column('food_item_id', 'int');

    constructor() {
        super('food_combo_item')
    }
}

export const tFoodComboItem = new FoodComboItemTable();

export type FoodComboItemIRow = InsertableRow<FoodComboItemTable>;
export type FoodComboItemURow = UpdatableRow<FoodComboItemTable>;
export type FoodComboItemSRow = SelectedRow<FoodComboItemTable>;
export type InsertableFoodComboItem = InsertableValues<FoodComboItemTable>;
export type UpdatableFoodComboItem = UpdatableValues<FoodComboItemTable>;
export type FoodComboItem = SelectedValues<FoodComboItemTable>;
export const tFoodComboItemCols = extractColumnsFrom(tFoodComboItem);
