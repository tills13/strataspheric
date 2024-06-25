import * as styles from "./style.css";

import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.dashboardLayoutContainer}>{children}</div>;
}
