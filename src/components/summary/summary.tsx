"use client";
import { useCart } from "../../hooks/useCart/useCart";
import styles from "./summary.module.scss";

export const Summary = () => {
  const {
    cart: { total, items },
  } = useCart();

  const text = items?.length > 1 ? " products" : " product";
  return (
    <div className={styles["container"]} data-testid="summary">
      <span>{`Subtotal (${items.length} ${text}): `} </span>
      <span>{`$${total}`} </span>
    </div>
  );
};
