import { renderHook, act } from "@testing-library/react";
import { useCart } from "./useCart";
import { CartItems } from "core/types/cartItem";
import currency from "currency.js";
import products from "../../mocks/products.json";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => {
    const cart = {
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 3 },
      ],
      total: currency(50),
    };

    const updateCart = (newCart: CartItems) => {
      cart.items = newCart.items;
      cart.total = newCart.total;
    };

    return {
      cart,
      updateCart,
    };
  },
}));

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(products),
    } as any);
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("useCart hook", () => {
  it("should add a product to the cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addProduct({
        id: 3,
        price: 20,
      } as any);
    });

    expect(result.current.cart.items).toEqual([
      { id: 1, quantity: 1 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 1 }, // New product added
    ]);
    expect(result.current.cart.total).toStrictEqual(currency(70)); // Total price updated
  });

  it("should increase quantity if product added already exists in cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addProduct({
        id: 2,
        price: 20,
      } as any);
    });

    expect(result.current.cart.items).toEqual([
      { id: 1, quantity: 1 },
      { id: 2, quantity: 4 }, // Quantity increased
    ]);
  });

  it("should remove a product from the cart", () => {
    const { result } = renderHook(() => useCart()); // current total 50

    act(() => {
      result.current.removeProduct({ id: 2, price: 15 } as any);
    });

    expect(result.current.cart.items).toEqual([{ id: 1, quantity: 1 }]);
    expect(result.current.cart.total).toStrictEqual(currency(5)); // Total price updated
  });

  it("should remove a quantity of a product from the cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.removeQuantity({ id: 2, price: 15 } as any);
    });

    expect(result.current.cart.items).toEqual([
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 }, // Quantity decreased
    ]);
    expect(result.current.cart.total).toStrictEqual(currency(35)); // Total price updated
  });

  it("should remove product of quantity is equals 1", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.removeQuantity({ id: 1, price: 15 } as any);
    });

    expect(result.current.cart.items).toEqual([{ id: 2, quantity: 3 }]);
    expect(result.current.cart.total).toStrictEqual(currency(35)); // Total price updated
  });

  it("should get cart products", async () => {
    const { result } = renderHook(() => useCart());

    const products = await act(() => result.current.getCartProducts());

    expect(products).toEqual([products[0], products[1]]);
  });
});
