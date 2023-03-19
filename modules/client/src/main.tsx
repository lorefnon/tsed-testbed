import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";
import "antd/dist/reset.css";

const reactRoot = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
reactRoot.render(
  <React.StrictMode>
    <QueryParamProvider adapter={WindowHistoryAdapter}>
      <App />
    </QueryParamProvider>
  </React.StrictMode>
);
