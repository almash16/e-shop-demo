import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./loading.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="darkgrey" height={"350px"}>
      <div className={styles["container"]} data-testid={"loading-skeletons"}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </SkeletonTheme>
  );
}
