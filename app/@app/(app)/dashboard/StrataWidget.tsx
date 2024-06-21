import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { NewWidgetWidget } from "../../../../components/NewWidgetWidget";
import { Widget } from "../../../../components/Widget";
import { can, p } from "../../../../data/users/permissions";
import { getWidgets } from "../../../../data/widgets/getWidgets";
import {
  createEventAction,
  createFileAction,
  deleteWidgetAction,
  deleteWidgetEventAction,
  deleteWidgetFileAction,
  upsertStrataWidget,
} from "./actions";

interface Props {
  strataId: string;
}

export async function StrataWidgets({ strataId }: Props) {
  const session = await auth();
  const widgets = await getWidgets(strataId);

  return (
    <div className={styles.dashboardWidgetGridContainer}>
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          createEvent={createEventAction.bind(undefined, strataId, widget.id)}
          createFile={createFileAction.bind(undefined, strataId, widget.id)}
          deleteEvent={deleteWidgetEventAction.bind(undefined, widget.id)}
          deleteFile={deleteWidgetFileAction.bind(undefined, widget.id)}
          deleteWidget={deleteWidgetAction.bind(undefined, widget.id)}
          upsertStrataWidget={upsertStrataWidget.bind(
            undefined,
            strataId,
            widget.id,
          )}
          widget={widget}
        />
      ))}
      {can(session?.user, p("stratas", "widgets", "create")) && (
        <NewWidgetWidget
          upsertStrataWidget={upsertStrataWidget.bind(
            undefined,
            strataId,
            undefined,
          )}
        />
      )}
    </div>
  );
}
