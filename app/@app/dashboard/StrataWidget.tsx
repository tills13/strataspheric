import * as styles from "./style.css";

import { auth } from "../../../auth";
import { NewWidgetWidget } from "../../../components/NewWidgetWidget";
import { Widget } from "../../../components/Widget";
import { Strata } from "../../../data";
import { can, p } from "../../../data/users/permissions";
import { getWidgets } from "../../../data/widgets/getWidgets";
import {
  createEventAction,
  deleteWidgetAction,
  deleteWidgetEventAction,
  deleteWidgetFileAction,
  upsertFileWidgetFileAction,
  upsertStrataWidget,
} from "./actions";

interface Props {
  strata: Strata;
}

export async function StrataWidgets({ strata }: Props) {
  const [session, widgets] = await Promise.all([auth(), getWidgets(strata.id)]);

  return (
    <div className={styles.dashboardWidgetGridContainer}>
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          createEvent={createEventAction.bind(undefined, strata.id, widget.id)}
          createFile={upsertFileWidgetFileAction.bind(
            undefined,
            strata.id,
            widget.id,
          )}
          deleteEvent={deleteWidgetEventAction.bind(undefined, widget.id)}
          deleteFile={deleteWidgetFileAction.bind(undefined, widget.id)}
          deleteWidget={deleteWidgetAction.bind(undefined, widget.id)}
          upsertStrataWidget={upsertStrataWidget.bind(
            undefined,
            strata.id,
            widget.id,
          )}
          strata={strata}
          widget={widget}
        />
      ))}
      {can(session?.user, p("stratas", "widgets", "create")) && (
        <NewWidgetWidget
          upsertStrataWidget={upsertStrataWidget.bind(
            undefined,
            strata.id,
            undefined,
          )}
        />
      )}
    </div>
  );
}
