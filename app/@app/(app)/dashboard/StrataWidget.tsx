import * as styles from "./style.css";

import { NewWidgetWidget } from "../../../../components/NewWidgetWidget";
import { Widget } from "../../../../components/Widget";
import { getWidgets } from "../../../../data/widgets/getWidgets";
import {
  createEventAction,
  createFileAction,
  createWidgetAction,
  deleteWidgetAction,
  deleteWidgetEventAction,
  deleteWidgetFileAction,
} from "./actions";

interface Props {
  strataId: string;
}

export async function StrataWidgets({ strataId }: Props) {
  const widgets = await getWidgets(strataId);
  return (
    <div className={styles.dashboardWidgetGridContainer}>
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          createEvent={createEventAction.bind(undefined, widget.id)}
          createFile={createFileAction.bind(undefined, strataId, widget.id)}
          deleteEvent={deleteWidgetEventAction.bind(undefined, widget.id)}
          deleteFile={deleteWidgetFileAction.bind(undefined, widget.id)}
          deleteWidget={deleteWidgetAction.bind(undefined, widget.id)}
          widget={widget}
        />
      ))}
      <NewWidgetWidget
        createWidget={createWidgetAction.bind(undefined, strataId)}
      />
    </div>
  );
}
