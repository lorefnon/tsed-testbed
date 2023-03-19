import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "antd/dist/reset.css";

const reactRoot = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
reactRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>
);
