import * as styles from "./style.css";

export default async function Layout({ children }) {
  return <div className={styles.dashboardLayoutContainer}>{children}</div>;
}
