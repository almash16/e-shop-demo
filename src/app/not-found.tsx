import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles["not-found"]}>
      <h1> Page not found :(</h1>
    </div>
  );
}
