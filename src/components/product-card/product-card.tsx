import { FakeAPIProduct } from "core/types/product";
import styles from "./product-card.module.scss";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: FakeAPIProduct;
}

export const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <Link href={`/product?id=${product.id}`} className={styles["container"]}>
      <div className={styles["card"]}>
        <div className={styles["product-image"]}>
          <Image
            alt=""
            src={product.image}
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>
        <div className={styles["title"]}>
          <span>{`${product.title} - ${product.rating.rate}/5  (${product.rating.count})`}</span>
        </div>
        <span className={styles["divider"]} />
        <span className={styles["price"]}>{`$${product.price}`} </span>
      </div>
    </Link>
  );
};
