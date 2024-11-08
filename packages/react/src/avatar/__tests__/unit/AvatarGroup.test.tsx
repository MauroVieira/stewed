import React from "react";
// UI Components
import { Avatar } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Avatar Group", () => {
  it("should renders default component", () => {
    const { asFragment } = render(
      <Avatar.Group>
        <Avatar name="Emma Clark" />
      </Avatar.Group>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render additional classes", () => {
    const { asFragment } = render(
      <Avatar.Group className="other-class">
        <Avatar name="Emma Clark" />
      </Avatar.Group>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
