import * as styles from "./style.css";

import React from "react";

import { DashboardDesktopNavigation } from "../../../components/DashboardDesktopNavigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardLayoutContainer}>
      <DashboardDesktopNavigation />
      {children}
    </div>
  );
}
