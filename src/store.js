import { combineReducers, createStore, compose } from "redux";
import * as reducers from "./reducers";

const reducer = combineReducers({ ...reducers });
const enhancers = [];

if (import.meta.env.DEV) {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(...enhancers);

const store = createStore(reducer, composedEnhancers);

export default store;
