import * as styles from "./style.css";

import React from "react";

import { Sidebar } from "../../../components/DashboardNavigation/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardLayoutContainer}>
      <Sidebar />

      <div className={styles.dashboardContentsContainer}>{children}</div>
    </div>
  );
}
