"use client";

import { CartItemCard } from "core/components/cart-item-card/cart-item-card";
import styles from "./page.module.scss";
import { Summary } from "core/components/summary/summary";
import { useCart } from "../../hooks/useCart/useCart";
import { useState, useEffect } from "react";
import { FakeAPIProduct } from "core/types/product";

interface CartProduct {
  product: FakeAPIProduct;
  quantity: number;
}

export default function Page() {
  const { getCartProducts } = useCart();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCartProducts().then((data) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["container"]}>
      {products?.length > 0 ? (
        <>
          <div className={styles["items"]}>
            {products.map((p) => (
              <CartItemCard
                key={p.product.id}
                product={p.product}
                quantity={p.quantity}
              />
            ))}
          </div>
          <div className={styles["summary"]}>
            <Summary />
          </div>
        </>
      ) : (
        <h1> Empty cart </h1>
      )}
    </div>
  );
}
