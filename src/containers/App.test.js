import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount } from "enzyme";
import App from "./App";

configure({ adapter: new Adapter() });

describe("renders without crashing container App", () => {
  it("should render div", () => {
    expect(shallow(<App />).find("div").length).toBe(1);
  });

  it("should render Provider", () => {
    expect(shallow(<App />).find("Provider").length).toBe(1);
  });

  it("should render Bowling", () => {
    expect(mount(<App />).find("Bowling").length).toBe(1);
  });
});
