import React from "react";
import { render, screen } from "@testing-library/react";
import { Summary } from "./summary";
import * as cartHook from "../../hooks/useCart/useCart";

jest.mock("../../hooks/useCart/useCart");
describe("Summary >1 items", () => {
  it("displays the correct subtotal", () => {
    jest.spyOn(cartHook, "useCart").mockReturnValue({
      cart: {
        total: 100,
        items: [{ id: 1 }, { id: 2 }],
      },
    } as any);

    const { asFragment } = render(<Summary />);
    expect(asFragment()).toMatchSnapshot();

    const subtotalElement = screen.getByText(/Subtotal/);
    expect(subtotalElement).toBeInTheDocument();

    const priceElement = screen.getByText("$100");
    expect(priceElement).toBeInTheDocument();
  });

  it("displays the product instead of products if items length == 1", () => {
    jest.spyOn(cartHook, "useCart").mockReturnValue({
      cart: {
        total: 100,
        items: [{ id: 1 }],
      },
    } as any);
    render(<Summary />);
    const productText = screen.getByText(/product/);
    expect(productText).toBeInTheDocument();
  });
});
