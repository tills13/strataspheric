import * as styles from "./style.css";

import { notFound } from "next/navigation";
import React from "react";

import { Widget } from "../../../../components/Widget";
import { getCurrentStrata } from "../../../../db/stratas/getStrata";
import { getWidgets } from "../../../../db/widgets/getWidgets";
import {
  createEventAction,
  createFileAction,
  deleteWidgetAction,
} from "./actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const widgets = await getWidgets(strata.id);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardWidgetGridContainer}>
        {widgets.map((widget) => (
          <Widget
            key={widget.id}
            createEvent={createEventAction}
            createFile={createFileAction}
            deleteWidget={deleteWidgetAction}
            widget={widget}
          />
        ))}
      </div>
    </div>
  );
}
