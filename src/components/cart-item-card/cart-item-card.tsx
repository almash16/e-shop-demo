import { FakeAPIProduct } from "core/types/product";
import Image from "next/image";

import styles from "./cart-item-card.module.scss";
import { useCart } from "../../hooks/useCart/useCart";

interface CartItemCardProps {
  product: FakeAPIProduct;
  quantity: number;
}

export const CartItemCard = ({ product, quantity }: CartItemCardProps) => {
  const { removeProduct, addProduct, removeQuantity } = useCart();
  const handleChange = () => {
    removeProduct(product);
  };

  return (
    <div className={styles["container"]} data-testid="cart-item-card">
      <div className={styles["image"]}>
        <Image alt="" src={product.image} sizes="100vw" width={0} height={0} />
      </div>
      <div className={styles["info"]}>
        <span className={styles["title"]}>{product.title}</span>
        <span className={styles["price"]}>{`$${product.price}`}</span>
        <button className={styles["button"]} onClick={handleChange}>
          Remove
        </button>
        <div className={styles["quantity"]}>
          <span>Quantity:</span>
          <button onClick={() => removeQuantity(product)}>-</button>
          <span>{`${quantity}`}</span>
          <button onClick={() => addProduct(product)}>+</button>
        </div>
      </div>
    </div>
  );
};
