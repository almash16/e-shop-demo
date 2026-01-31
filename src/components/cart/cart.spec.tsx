import React from "react";
import { render } from "@testing-library/react";
import { Cart } from "./cart";

describe("Cart Component", () => {
  it("should render without a notification when the cart is empty", () => {
    const useCartMock = jest.fn(() => ({ cart: { items: [] } }));
    jest.spyOn(React, "useContext").mockImplementation(useCartMock);

    const { queryByTestId } = render(<Cart />);
    expect(queryByTestId("notification")).toBeNull();
  });

  it("should render with a notification when the cart is not empty", () => {
    // Mock the useCart hook to return a non-empty cart
    const useCartMock = jest.fn(() => ({
      cart: { items: [{ id: 1, quantity: 2 }] },
    }));
    jest.spyOn(React, "useContext").mockImplementation(useCartMock);

    const { getByTestId, asFragment } = render(<Cart />);

    const notification = getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification.textContent).toBe("1");

    expect(asFragment()).toMatchSnapshot();
  });
});
