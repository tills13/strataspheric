import * as styles from "./style.css";

import React from "react";
import { getWidgets } from "../../../data/widgets/getWidgets";
import { Widget } from "../../../components/Widget";
import {
  createEventAction,
  createFileAction,
  deleteWidgetAction,
} from "./actions";
import { getCurrentStrata } from "../../../data/stratas/getStrata";
import { notFound } from "next/navigation";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const widgetIds = await getWidgets(strata);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardWidgetGridContainer}>
        {widgetIds.map((widgetId) => (
          <Widget
            key={widgetId}
            createEvent={createEventAction}
            createFile={createFileAction}
            deleteWidget={deleteWidgetAction}
            widgetId={widgetId}
          />
        ))}
      </div>
    </div>
  );
}
