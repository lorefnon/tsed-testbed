/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FoodItemListPayload } from '../models/FoodItemListPayload';
import type { FoodItemPayload } from '../models/FoodItemPayload';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FoodItemsControllerService {

    /**
     * @param requestBody
     * @returns FoodItemPayload Success
     * @throws ApiError
     */
    public static upsertOne(
        requestBody?: FoodItemPayload,
    ): CancelablePromise<FoodItemPayload> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/food-items',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param foodComboId
     * @returns FoodItemListPayload Success
     * @throws ApiError
     */
    public static findByCombo(
        foodComboId: number,
    ): CancelablePromise<FoodItemListPayload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/food-combos/{foodComboId}/items',
            path: {
                'foodComboId': foodComboId,
            },
        });
    }

}
