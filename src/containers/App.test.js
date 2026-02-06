import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import App from "./App";

describe("renders without crashing container App", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("should render the bowling container", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container.querySelector(".bowling-container")).toBeTruthy();
  });
});
