import React, { Suspense } from "react";

import { DashboardLayout } from "../../../components/DashboardLayout";
import { Grid } from "../../../components/Grid";
import { WidgetSkeleton } from "../../../components/Skeleton/WidgetSkeleton";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { StrataWidgets } from "./StrataWidget";

export const runtime = "edge";

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
