import * as styles from "./style.css";

import React, { Suspense } from "react";

import { Grid } from "../../../components/Grid";
import { WidgetSkeleton } from "../../../components/Skeleton/WidgetSkeleton";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { StrataWidgets } from "./StrataWidget";

export const runtime = "edge";

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  return (
    <div className={styles.pageContainer}>
      <Suspense
        fallback={
          <Grid cols={{ base: 1, tabletPlus: 2, desktop: 3 }}>
            <WidgetSkeleton />
            <WidgetSkeleton />
            <WidgetSkeleton />
          </Grid>
        }
      >
        <StrataWidgets strata={strata} />
      </Suspense>
    </div>
  );
}
