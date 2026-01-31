import React from "react";
import { render } from "@testing-library/react";
import Loading from "./loading";

test("Loading component displays skeleton", () => {
  const { container } = render(<Loading />);
  const skeleton = container.querySelector(".react-loading-skeleton");

  // Assert that the skeleton component is present
  expect(skeleton).toBeInTheDocument();
});
