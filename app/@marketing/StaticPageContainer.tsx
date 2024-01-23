import * as styles from "./style.css";

export function StaticPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.staticPageContainer}>{children}</div>;
}
