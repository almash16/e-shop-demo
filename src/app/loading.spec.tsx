import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./loading";

test("Loading component renders the expected number of Skeletons", () => {
  render(<Loading />);

  // Check if the Skeleton components are rendered
  const skeletonElements = screen.getByTestId("loading-skeletons");

  expect(skeletonElements.children).toHaveLength(9);
});
