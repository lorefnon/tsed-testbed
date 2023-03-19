import { NumberParam, StringParam, useQueryParam } from "use-query-params"

export const useDeliveryIdParam = () => useQueryParam('scheduleId', NumberParam);

export const useTabParam = () => useQueryParam('tab', StringParam)