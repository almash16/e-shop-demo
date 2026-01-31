"use client";

import { FakeAPIProduct } from "core/types/product";
import { ProductCard } from "../product-card/product-card";
import styles from "./product-list.module.scss";

import { useProducts } from "core/hooks/useProducts/useProducts";
import { splitList } from "core/utils/list-utils";
import { useState } from "react";

interface ProductListProps {
  products: FakeAPIProduct[];
  items?: number;
}

export const ProductList = ({ products, items = 12 }: ProductListProps) => {
  const filteredProducts = useProducts(products);
  const { parts } = splitList(filteredProducts, items);
  const [current, setCurrent] = useState(0);

  const handleChange = (index: number) => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrent(index);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["products-grid"]}>
        {parts[current]?.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
        {filteredProducts?.length === 0 && (
          <span className={styles["empty"]}>No products found :(</span>
        )}
      </div>
      <div className={styles["selector"]}>
        <button
          className={styles["actions"]}
          onClick={() => handleChange(current - 1)}
          disabled={current === 0}
          data-testid={"back-button"}
        >
          {"<"}
        </button>
        {parts.map((_, index) => (
          <button
            key={`page-${index}`}
            className={styles["pages"]}
            onClick={() => handleChange(index)}
            tabIndex={0}
            disabled={current === index}
            data-testid={`page-${index}-button`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handleChange(current + 1)}
          disabled={current >= parts?.length - 1}
          className={styles["actions"]}
          data-testid={"next-button"}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
