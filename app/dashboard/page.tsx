import * as styles from "./style.css";

import React from "react";
import { NewWidgetForm } from "../../components/NewWidgetForm";
import { getWidgets } from "../../data/widgets/getWidgets";
import { Widget } from "../../components/Widget";
import {
  createEventAction,
  createFileAction,
  createWidgetAction,
  deleteWidgetAction,
} from "./actions";
import { auth } from "../../auth";
import { can } from "../../data/members/permissions";
import { Header } from "../../components/Header";
import { ElementGroup } from "../../components/ElementGroup";
import { mustGetCurrentStrata } from "../../data/stratas/getStrata";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await mustGetCurrentStrata();
  const widgets = await getWidgets(strata);

  return (
    <div className={styles.pageContainer}>
      <Header className={styles.pageTitle} priority={2}>
        Widgets
      </Header>

      <div className={styles.dashboardWidgetGridContainer}>
        {can(session?.user, "stratas.widgets.create") && (
          <ElementGroup gap="small" orientation="column">
            <Header priority={3}>Add Widget</Header>

            <NewWidgetForm
              createWidget={createWidgetAction}
              strataId={strata.id}
            />
          </ElementGroup>
        )}
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
