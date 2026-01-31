import { CartIcon } from "../icons/cart-icon";
import styles from "./cart.module.scss";
import Link from "next/link";

import { useCart } from "core/hooks/useCart/useCart";

export const Cart = () => {
  const { cart } = useCart();

  return (
    <Link
      className={styles["container"]}
      href="/cart"
      data-testid="cart-component"
    >
      {cart.items.length > 0 && (
        <span className={styles["notification"]} data-testid="notification">
          {cart.items?.length}
        </span>
      )}
      <CartIcon />
    </Link>
  );
};
