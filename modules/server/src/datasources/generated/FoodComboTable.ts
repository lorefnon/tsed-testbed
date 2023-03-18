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

export class FoodComboTable extends Table<DBConnection, 'FoodComboTable'> {
    id = this.primaryKey('id', 'int');
    name = this.column('name', 'string');

    constructor() {
        super('food_combo')
    }
}

export const tFoodCombo = new FoodComboTable();

export type FoodComboIRow = InsertableRow<FoodComboTable>;
export type FoodComboURow = UpdatableRow<FoodComboTable>;
export type FoodComboSRow = SelectedRow<FoodComboTable>;
export type InsertableFoodCombo = InsertableValues<FoodComboTable>;
export type UpdatableFoodCombo = UpdatableValues<FoodComboTable>;
export type FoodCombo = SelectedValues<FoodComboTable>;
export const tFoodComboCols = extractColumnsFrom(tFoodCombo);
