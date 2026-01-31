import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProductList } from "./product-list";
import { FakeAPIProduct } from "core/types/product";

describe("ProductList", () => {
  it("displays a list of products correctly", () => {
    const products: FakeAPIProduct[] = [
      {
        id: 1,
        title: "Product 1",
        price: 19.99,
        image: "/sample-image-test",
        rating: {
          rate: 4,
          count: 4,
        },
      } as any,
      {
        id: 2,
        title: "Product 2",
        price: 24.99,
        image: "/sample-image-test",
        rating: {
          rate: 4,
          count: 4,
        },
      },
    ];

    const { asFragment } = render(<ProductList products={products} />);
    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText("Product 1 - 4/5 (4)")).toBeInTheDocument();
    expect(screen.getByText("Product 2 - 4/5 (4)")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(products.length);
  });

  it("should display n items per page", () => {
    jest.spyOn(window, "scrollTo").mockImplementation(jest.fn());
    const products: FakeAPIProduct[] = [
      {
        id: 1,
        title: "Product 1",
        price: 19.99,
        image: "/sample-image-test",
        rating: {
          rate: 4,
          count: 4,
        },
      } as any,
      {
        id: 2,
        title: "Product 2",
        price: 24.99,
        image: "/sample-image-test",
        rating: {
          rate: 4,
          count: 4,
        },
      },
      {
        id: 3,
        title: "Product 3",
        price: 24.99,
        image: "/sample-image-test",
        rating: {
          rate: 4,
          count: 4,
        },
      },
    ];

    render(<ProductList products={products} items={1} />);

    expect(screen.queryByText("Product 1 - 4/5 (4)")).toBeInTheDocument();
    expect(screen.queryByText("Product 2 - 4/5 (4)")).toBeNull();
    expect(screen.queryByText("Product 3 - 4/5 (4)")).toBeNull();

    // back button should be disabled in first page
    expect(screen.getByTestId("back-button")).toBeDisabled();

    // go to next page
    fireEvent.click(screen.getByTestId("next-button"));

    //only item 2 is presented
    expect(screen.queryByText("Product 1 - 4/5 (4)")).toBeNull();
    expect(screen.queryByText("Product 2 - 4/5 (4)")).toBeInTheDocument();
    expect(screen.queryByText("Product 3 - 4/5 (4)")).toBeNull();

    // go back
    fireEvent.click(screen.getByTestId("back-button"));
    expect(screen.queryByText("Product 1 - 4/5 (4)")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("page-2-button"));
    expect(screen.queryByText("Product 3 - 4/5 (4)")).toBeInTheDocument();

    // next button should be disabled in last page
    expect(screen.getByTestId("next-button")).toBeDisabled();
  });

  it('displays a "No products found" message when no products are available', () => {
    const products: FakeAPIProduct[] = [];

    render(<ProductList products={products} />);
    expect(screen.getByText("No products found :(")).toBeInTheDocument();
  });
});
