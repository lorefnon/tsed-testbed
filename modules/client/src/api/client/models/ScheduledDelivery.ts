/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FoodCombo } from './FoodCombo';

export type ScheduledDelivery = {
    id?: number;
    foodCombo: FoodCombo;
    arrivalTime: number;
};

