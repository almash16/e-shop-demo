"use client";

import { CartItemCard } from "core/components/cart-item-card/cart-item-card";
import styles from "./page.module.scss";
import { Summary } from "core/components/summary/summary";
import { useCart } from "../../hooks/useCart/useCart";

export default async function Page() {
  const { getCartProducts } = useCart();
  const products = await getCartProducts();

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
