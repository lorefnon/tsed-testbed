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

export class ScheduledDeliveryTable extends Table<DBConnection, 'ScheduledDeliveryTable'> {
    id = this.primaryKey('id', 'int');
    foodComboId = this.column('food_combo_id', 'int');
    arrivalTime = this.optionalColumn('arrival_time', 'int');

    constructor() {
        super('scheduled_delivery')
    }
}

export const tScheduledDelivery = new ScheduledDeliveryTable();

export type ScheduledDeliveryIRow = InsertableRow<ScheduledDeliveryTable>;
export type ScheduledDeliveryURow = UpdatableRow<ScheduledDeliveryTable>;
export type ScheduledDeliverySRow = SelectedRow<ScheduledDeliveryTable>;
export type InsertableScheduledDelivery = InsertableValues<ScheduledDeliveryTable>;
export type UpdatableScheduledDelivery = UpdatableValues<ScheduledDeliveryTable>;
export type ScheduledDelivery = SelectedValues<ScheduledDeliveryTable>;
export const tScheduledDeliveryCols = extractColumnsFrom(tScheduledDelivery);
