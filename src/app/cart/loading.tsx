"use client";
import { useCart } from "../../hooks/useCart/useCart";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./page.module.scss";

export default function LoadingCart() {
  const {
    cart: { items },
  } = useCart();

  return (
    <SkeletonTheme baseColor="darkgrey" height={"350px"}>
      <div className={styles["container"]}>
        <div className={styles["items"]}>
          {items.map((item) => (
            <Skeleton
              key={item.id}
              height={150}
              containerTestId="skeleton-item"
            />
          ))}
        </div>
        <div className={styles["summary"]}>
          <Skeleton height={100} containerTestId="skeleton-summary" />
        </div>
      </div>
    </SkeletonTheme>
  );
}
