/**
 * DO NOT EDIT:
 *
 * This file has been auto-generated from database schema using ts-sql-codegen.
 * Any changes will be overwritten.
 */
import { Table } from "ts-sql-query/Table";
import type { DBConnection } from "../DBConnection.ts";
import { extractColumnsFrom } from "ts-sql-query/extras/utils"

export class FoodComboTable extends Table<DBConnection, 'FoodComboTable'> {
    id = this.autogeneratedPrimaryKey('id', 'int');
    name = this.column('name', 'string');

    constructor() {
        super('food_combo')
    }
}

export const tFoodCombo = new FoodComboTable();

export const tFoodComboCols = extractColumnsFrom(tFoodCombo);