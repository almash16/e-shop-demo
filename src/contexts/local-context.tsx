"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CartItems } from "../types/cartItem";
import currency from "currency.js";
import { checkIfSSR } from "core/utils/checkIfSSR";

interface LocalContextProps {
  cart: CartItems;
  updateCart: (cart: CartItems) => void;
}

export const LocalContext = createContext<LocalContextProps>({
  cart: { items: [], total: currency(0) },
  updateCart: () => {},
});

interface LocalContextProviderProps {
  children: ReactNode;
}

export const LocalContextProvider = ({
  children,
}: LocalContextProviderProps) => {
  const [cart, setCart] = useState<CartItems>({
    items: [],
    total: currency(0),
  });

  useEffect(() => {
    if (checkIfSSR()) return;
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (cart: CartItems) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <LocalContext.Provider value={{ cart, updateCart }}>
      {children}
    </LocalContext.Provider>
  );
};
