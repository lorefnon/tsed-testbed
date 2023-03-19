import { useEffect } from "react"
import { useScheduledDeliveries } from "../stores/scheduled-deliveries"
import { useDeliveryIdParam, useTabParam } from "../utils/query-param-hooks"
import ScheduledDeliveryForm from "./ScheduledDeliveryForm"

/** Url param aware page component for creating/updating a single delivery */
export default function ScheduledDeliveryEditor() {
  const [deliveryId, setDeliveryId] = useDeliveryIdParam()
  const [,setTabKey] = useTabParam()
  const scheduledDeliveries = useScheduledDeliveries()

  const delivery = deliveryId ? scheduledDeliveries.byId[deliveryId] : null

  useEffect(() => {
    if (deliveryId && !delivery) {
        setTabKey('explore')
        setDeliveryId(null)
    }
  }, [])

  if (deliveryId && !delivery) return null

  return <ScheduledDeliveryForm delivery={delivery} />
}