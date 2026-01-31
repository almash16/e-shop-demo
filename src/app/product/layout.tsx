import Link from "next/link";
import styles from "./layout.module.scss";
import { BackIcon } from "core/components/icons/back-button";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles["container"]}>
      <Link
        className={styles["back"]}
        href={"/"}
        aria-label="back to home page"
      >
        <BackIcon />
      </Link>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
