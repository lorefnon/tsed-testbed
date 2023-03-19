/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduledDeliveryListPayload } from '../models/ScheduledDeliveryListPayload';
import type { ScheduledDeliveryPayload } from '../models/ScheduledDeliveryPayload';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScheduledDeliveryControllerService {

    /**
     * @param requestBody
     * @returns ScheduledDeliveryPayload Success
     * @throws ApiError
     */
    public static upsertOne(
        requestBody?: ScheduledDeliveryPayload,
    ): CancelablePromise<ScheduledDeliveryPayload> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/rest/scheduled-deliveries',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param date
     * @returns ScheduledDeliveryListPayload Success
     * @throws ApiError
     */
    public static findByDate(
        date?: string,
    ): CancelablePromise<ScheduledDeliveryListPayload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/scheduled-deliveries',
            query: {
                'date': date,
            },
        });
    }

}
