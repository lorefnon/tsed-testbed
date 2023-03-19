import { Tabs } from "antd";
import { StringParam, useQueryParam } from "use-query-params";
import "./App.css";
import ScheduledDeliveryEditor from "./components/ScheduledDeliveryEditor";
import ScheduledDeliveryList from "./components/ScheduledDeliveryList";

function App() {
  const [tabKey, setTabKey] = useQueryParam('tab', StringParam)

  return (
    <div className="App">
      <div className="App__header">Food Truck Scheduler</div>
      <div className="App__body">
        <Tabs
          activeKey={tabKey ?? 'explore'}
          onChange={nextKey => {
            setTabKey(nextKey)
          }}
          items={[
            {
              key: "explore",
              label: "Explore Scheduled Food Trucks",
              children: <ScheduledDeliveryList  />,
            },
            {
              key: "manage",
              label: "Manage delivery schedules",
              children: <ScheduledDeliveryEditor />
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
