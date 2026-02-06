import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./containers/App";
import "./index.css";

const rootEl = document.querySelector("#root");
const root = createRoot(rootEl);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
