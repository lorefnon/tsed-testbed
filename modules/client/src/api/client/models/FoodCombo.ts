/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FoodItem } from './FoodItem';

export type FoodCombo = {
    id?: number;
    /**
     * Description of food combination
     */
    name?: string;
    items?: Array<FoodItem>;
};

