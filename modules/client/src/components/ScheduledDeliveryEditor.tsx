import { useEffect } from "react"
import { NumberParam, StringParam, useQueryParam } from "use-query-params"
import { useScheduledDeliveries } from "../stores/scheduled-deliveries"
import ScheduledDeliveryForm from "./ScheduledDeliveryForm"

export default function ScheduledDeliveryEditor() {
  const [scheduleId] = useQueryParam('scheduleId', NumberParam)
  const [,setTabKey] = useQueryParam('tab', StringParam)
  const scheduledDeliveries = useScheduledDeliveries()

  const delivery = scheduleId ? scheduledDeliveries.byId[scheduleId] : null

  useEffect(() => {
    if (scheduleId && !delivery) {
        setTabKey('explore')
    }
  }, [])

  if (scheduleId && !delivery) return null

  return <ScheduledDeliveryForm delivery={delivery} />
}