import React from "react";
import { shallow } from "enzyme";

import Navbar from "./Navbar-component";
import { findByTestAttr } from "../../../../utils/index";

// Declare general function to provide component which is tested
const setUpComponent = (props = {}) => {
  const component = shallow(<Navbar {...props} />);
  return component;
};

describe("Navbar component", () => {
  let component;

  // Declare component before every single test
  beforeEach(() => {
    component = setUpComponent();
  });
  //test one
  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
  //test two
  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "ang-navbar");
    expect(wrapper.length).toBe(1);
  });
  //test tree
  it("Should render a logo", () => {
    const logo = findByTestAttr(component, "ang-logo");
    expect(logo.length).toBe(1);
  });
});
