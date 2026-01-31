import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./product-card";
import { FakeAPIProduct } from "core/types/product";

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    const productData: FakeAPIProduct = {
      id: 1,
      title: "Sample Product",
      rating: { rate: 4.5, count: 100 },
      price: 19.99,
      image: "/sample-image-url",
      description: "",
      category: "",
    };

    const { asFragment } = render(<ProductCard product={productData} />);
    expect(asFragment()).toMatchSnapshot();

    expect(
      screen.getByText("Sample Product - 4.5/5 (100)")
    ).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });
});
