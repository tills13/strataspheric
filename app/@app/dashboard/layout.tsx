import * as styles from "./style.css";

import React from "react";

import { DashboardDesktopNavigation } from "../../../components/DashboardDesktopNavigation";
import { DashboardHeader } from "../../../components/DashboardHeader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardLayoutContainer}>
      <DashboardDesktopNavigation />
      <DashboardHeader />
      {children}
    </div>
  );
}
