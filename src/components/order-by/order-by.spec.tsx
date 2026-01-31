import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OrderBy } from "./order-by"; // Import your OrderBy component

test("OrderBy component works correctly", () => {
  const { asFragment } = render(<OrderBy />);

  // should match snapshot
  expect(asFragment()).toMatchSnapshot();

  // Check if the initial state hides the modal
  expect(screen.queryByText("Featured")).toBeNull();

  // Click on the "Order by" button to open the modal
  const orderByButton = screen.getByText("Order by");
  fireEvent.click(orderByButton);

  // Check if the modal is displayed after clicking the button
  const featuredOption = screen.getByText("Featured");
  expect(featuredOption).toBeInTheDocument();

  // Click on the "Featured" option
  fireEvent.click(featuredOption);

  // Check if the modal is closed
  expect(screen.queryByText("Featured")).toBeNull();

  // Test keydown events
  fireEvent.keyDown(orderByButton, { code: "Enter" });
  expect(screen.queryByText("Featured")).toBeInTheDocument();

  fireEvent.keyDown(screen.getByText("Featured"), { code: "Enter" });
  expect(screen.queryByText("Featured")).toBeNull();
});
