import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartItemCard } from "./cart-item-card";
const useCartMock = {
  removeProduct: jest.fn(),
  addProduct: jest.fn(),
  removeQuantity: jest.fn(),
};
jest.mock("../../hooks/useCart/useCart", () => ({
  useCart: () => useCartMock,
}));

describe("CartItemCard Component", () => {
  it("should render a cart item card with correct product and quantity", () => {
    jest.spyOn(React, "useContext").mockImplementation(useCartMock as any);

    const product = {
      id: 1,
      title: "Sample Product",
      price: 10.0,
      image: "/sample-image.jpg",
    } as any;

    const quantity = 2;

    const { asFragment } = render(
      <CartItemCard product={product} quantity={quantity} />
    );

    //match snapshot
    expect(asFragment()).toMatchSnapshot();

    // Assert that the product title and price are rendered
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();

    // Assert that the remove button is rendered
    const removeButton = screen.getByText("Remove");
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(useCartMock.removeProduct).toBeCalledWith(product);

    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Assert that the "+" and "-" buttons are rendered
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();

    // Simulate a click on the "+" and "-" buttons and assert that the corresponding functions are called
    fireEvent.click(screen.getByText("+"));
    expect(useCartMock.addProduct).toHaveBeenCalledWith(product);

    fireEvent.click(screen.getByText("-"));
    expect(useCartMock.removeQuantity).toHaveBeenCalledWith(product);
  });
});
