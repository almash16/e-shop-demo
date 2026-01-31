import React from "react";
import { act, render, screen } from "@testing-library/react";
import { LocalContextProvider, LocalContext } from "./local-context";
import "@testing-library/jest-dom";
import currency from "currency.js";
import * as check from "../utils/checkIfSSR";

jest.mock("../utils/checkIfSSR");
jest.spyOn(check, "checkIfSSR").mockReturnValue(false);
jest.spyOn(Storage.prototype, "getItem");
Storage.prototype.getItem = jest.fn().mockReturnValue(
  JSON.stringify({
    items: [{ id: 1, quantity: 2 }],
    total: currency(100),
  })
);

describe("LocalContextProvider", () => {
  it("renders children", () => {
    render(
      <LocalContextProvider>
        <div>Child Component</div>
      </LocalContextProvider>
    );

    const childComponent = screen.getByText("Child Component");
    expect(childComponent).toBeInTheDocument();
  });

  it("provides cart and updateCart via context", () => {
    const mockCart = {
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 2 },
      ],
      total: currency(100),
    };

    render(
      <LocalContextProvider>
        <LocalContext.Consumer>
          {({ cart, updateCart }) => (
            <div>
              <span data-testid="cart-items">{cart.items.length}</span>
              <button
                data-testid="update-cart"
                onClick={() => updateCart(mockCart)}
              >
                Update Cart
              </button>
            </div>
          )}
        </LocalContext.Consumer>
      </LocalContextProvider>
    );

    const cartItems = screen.getByTestId("cart-items");
    expect(cartItems).toHaveTextContent("1"); // Initially, the cart contais data from storage

    const updateCartButton = screen.getByTestId("update-cart");
    act(() => updateCartButton.click()); // Simulate updating the cart

    const updatedCartItems = screen.getByTestId("cart-items");
    expect(updatedCartItems).toHaveTextContent("2"); // After the update, there should be 2 items in the cart
  });

  it("ssr rendering test", () => {
    jest.spyOn(check, "checkIfSSR").mockReturnValue(true);
    render(
      <LocalContextProvider>
        <LocalContext.Consumer>
          {({ cart }) => (
            <div>
              <span data-testid="cart-items">{cart.items.length}</span>
            </div>
          )}
        </LocalContext.Consumer>
      </LocalContextProvider>
    );
  });
});
