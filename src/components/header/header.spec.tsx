import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./header";

test("Header renders correctly", () => {
  const { getByText, getByTestId } = render(<Header />);
  // Check if the title "eShop Demo" is in the rendered component
  const titleElement = getByText("eShop Demo");
  expect(titleElement).toBeInTheDocument();

  // Check if the Cart and SearchInput components are rendered
  const cartComponent = getByTestId("cart-component");
  const searchInputComponent = getByTestId("search-input");
  expect(cartComponent).toBeInTheDocument();
  expect(searchInputComponent).toBeInTheDocument();
});
