import { Tabs } from "antd";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import "./App.css";
import AlertList from "./components/AlertList";
import ScheduledDeliveryEditor from "./components/ScheduledDeliveryEditor";
import ScheduledDeliveryList from "./components/ScheduledDeliveryList";

function App() {
  const [tabKey, setTabKey] = useQueryParam('tab', StringParam)
  const [scheduleId] = useQueryParam('scheduleId', NumberParam)

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
          items={[
            {
              key: "explore",
              label: "Explore Scheduled Food Trucks",
              children: <ScheduledDeliveryList  />,
            },
            {
              key: "manage",
              label: `${scheduleId ? 'Update' : 'Create'} delivery schedule`,
              children: <ScheduledDeliveryEditor />
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
