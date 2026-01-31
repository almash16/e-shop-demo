import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductInfo } from "./product-info";
import { FakeAPIProduct } from "core/types/product";

const mockPush = jest.fn();
const mockAddProduct = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const useCartMock = {
  addProduct: mockAddProduct,
};
jest.mock("../../hooks/useCart/useCart", () => ({
  useCart: () => useCartMock,
}));

const productData: FakeAPIProduct = {
  id: 1,
  title: "Sample Product",
  description: "Sample description",
  price: 19.99,
  image: "/sample-image-url",
  category: "",
  rating: {
    count: 1,
    rate: 4,
  },
};

describe("ProductInfo", () => {
  it("renders product information correctly", () => {
    const { asFragment } = render(<ProductInfo product={productData} />);

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("Sample description")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it('adds the product to the cart and redirects to the cart page when "Add to Cart" button is clicked', () => {
    render(<ProductInfo product={productData} />);

    // Find the "Add to Cart" button and click it
    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);
    expect(mockAddProduct).toHaveBeenCalledWith(productData);
    expect(mockPush).toHaveBeenCalledWith("/cart");
  });
});
