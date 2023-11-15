import * as styles from "./style.css";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.staticPageContainer}>{children}</div>;
}
