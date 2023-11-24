import * as styles from "./style.css";

import { notFound } from "next/navigation";
import React from "react";

import { DashboardHeader } from "../../../../components/DashboardHeader";
import { NewWidgetWidget } from "../../../../components/NewWidgetWidget";
import { Widget } from "../../../../components/Widget";
import { getCurrentStrata } from "../../../../db/stratas/getStrata";
import { getWidgets } from "../../../../db/widgets/getWidgets";
import {
  createEventAction,
  createFileAction,
  createWidgetAction,
  deleteWidgetAction,
  deleteWidgetEventAction,
  deleteWidgetFileAction,
} from "./actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const widgets = await getWidgets(strata.id);

  return (
    <>
      <DashboardHeader />
      <div className={styles.pageContainer}>
        <div className={styles.dashboardWidgetGridContainer}>
          {widgets.map((widget) => (
            <Widget
              key={widget.id}
              createEvent={createEventAction.bind(undefined, widget.id)}
              createFile={createFileAction.bind(
                undefined,
                strata.id,
                widget.id,
              )}
              deleteEvent={deleteWidgetEventAction.bind(undefined, widget.id)}
              deleteFile={deleteWidgetFileAction.bind(undefined, widget.id)}
              deleteWidget={deleteWidgetAction.bind(undefined, widget.id)}
              widget={widget}
            />
          ))}
          <NewWidgetWidget
            createWidget={createWidgetAction.bind(undefined, strata.id)}
          />
        </div>
      </div>
    </>
  );
}
