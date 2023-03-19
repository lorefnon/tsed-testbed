import { Tabs } from "antd";
import "./App.css";
import ScheduledDeliveryForm from "./components/ScheduledDeliveryForm";
import ScheduledDeliveryList from "./components/ScheduledDeliveryList";

function App() {
  return (
    <div className="App">
      <div className="App__header">Food Truck Scheduler</div>
      <div className="App__body">
        <Tabs
          items={[
            {
              key: "explore",
              label: "Explore Scheduled Food Trucks",
              children: <ScheduledDeliveryList  />,
            },
            {
              key: "manage",
              label: "Manage delivery schedules",
              children: <ScheduledDeliveryForm />
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
