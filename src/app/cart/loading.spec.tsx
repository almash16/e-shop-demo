import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingCart from "./loading";

jest.mock("../../hooks/useCart/useCart", () => ({
  useCart: () => ({
    cart: {
      items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    },
  }),
}));

test("LoadingCart component renders skeleton elements", () => {
  render(<LoadingCart />);

  const itemSkeletons = screen.getAllByTestId("skeleton-item");
  const summarySkeleton = screen.getByTestId("skeleton-summary");

  expect(itemSkeletons).toHaveLength(3);
  expect(summarySkeleton).toBeInTheDocument();
});
