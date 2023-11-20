import * as styles from "./style.css";

import React from "react";

import { Skeleton } from "../../../../components/Skeleton";

export const runtime = "edge";

export default async function Page() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardWidgetGridContainer}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
