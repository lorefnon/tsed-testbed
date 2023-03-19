import Tabs from "antd/es/tabs";
import AlertList from "./components/AlertList";
import ScheduledDeliveryEditor from "./components/ScheduledDeliveryEditor";
import ScheduledDeliveryList from "./components/ScheduledDeliveryList";
import { useDeliveryIdParam, useTabParam } from "./utils/query-param-hooks";

import "./App.css";

/* Top level component */
function App() {
  const [tabKey, setTabKey] = useTabParam()
  const [deliveryId] = useDeliveryIdParam()

  return (
    <div className="App">
      <div className="App__header">Food Truck Scheduler</div>
      <div className="App__body">
        <AlertList />
        <Tabs
          activeKey={tabKey ?? 'explore'}
          onChange={nextKey => {
            setTabKey(nextKey)
          }}
          destroyInactiveTabPane
          items={[
            {
              key: "explore",
              label: "Explore Scheduled Food Trucks",
              children: <ScheduledDeliveryList  />,
            },
            {
              key: "manage",
              label: `${deliveryId ? 'Update' : 'Create'} delivery schedule`,
              children: <ScheduledDeliveryEditor />
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
