import { render, screen } from "@testing-library/react";
import Page from "./page";
import * as cartHook from "../../hooks/useCart/useCart";

jest.mock("../../hooks/useCart/useCart");

test("Page component renders cart items when products are present", async () => {
  jest.spyOn(cartHook, "useCart").mockReturnValue({
    getCartProducts: async () => [
      { product: { id: 1, image: "/test-image" }, quantity: 2 },
      { product: { id: 2, image: "/test-image" }, quantity: 1 },
    ],
    cart: {
      total: 10,
      items: [
        { product: { id: 1 }, quantity: 2 },
        { product: { id: 2 }, quantity: 1 },
      ],
    },
  } as any);
  const page = await Page();
  render(page);

  const cartItemCards = screen.getAllByTestId("cart-item-card");
  expect(cartItemCards).toHaveLength(2);

  const summary = screen.getByTestId("summary");
  expect(summary).toBeInTheDocument();
});

test('Page component renders "Empty cart" message when no products are present', async () => {
  jest.spyOn(cartHook, "useCart").mockReturnValue({
    getCartProducts: async () => [],
    cart: {
      total: 10,
      items: [],
    },
  } as any);

  const page = await Page();
  render(page);

  const emptyCartMessage = screen.getByText("Empty cart");
  expect(emptyCartMessage).toBeInTheDocument();
});
