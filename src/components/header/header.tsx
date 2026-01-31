"use client";
import Link from "next/link";
import { SearchInput } from "../search-input/search-input";
import styles from "./header.module.scss";
import { Cart } from "../cart/cart";

export const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <Link href={"/"} className={styles["title"]}>
        eShop Demo
      </Link>
      <div className={styles["top-right"]}>
        <Cart />
        <SearchInput />
      </div>
    </header>
  );
};
