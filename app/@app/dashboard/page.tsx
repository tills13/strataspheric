import * as styles from "./style.css";

import React, { Suspense } from "react";

import { DashboardHeader } from "../../../components/DashboardHeader";
import { WidgetSkeleton } from "../../../components/Skeleton/WidgetSkeleton";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { StrataWidgets } from "./StrataWidget";

export const runtime = "edge";

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  return (
    <>
      <DashboardHeader />
      <div className={styles.pageContainer}>
        <Suspense
          fallback={
            <div className={styles.dashboardWidgetGridContainer}>
              <WidgetSkeleton />
              <WidgetSkeleton />
              <WidgetSkeleton />
            </div>
          }
        >
          <StrataWidgets strata={strata} />
        </Suspense>
      </div>
    </>
  );
}
