/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FoodComboListPayload } from '../models/FoodComboListPayload';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FoodComboControllerService {

    /**
     * @returns FoodComboListPayload Success
     * @throws ApiError
     */
    public static findAllNamed(): CancelablePromise<FoodComboListPayload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/food-combos/named',
        });
    }

}
