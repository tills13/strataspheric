import { Skeleton } from "../../../components/Skeleton";
import * as styles from "./style.css";

import React from "react";

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
