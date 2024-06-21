import { uuidv7 } from "uuidv7";

import { NewStrataWidget, StrataWidgetUpdate, db } from "..";

export function updateWidget(
  widgetId: string,
  widgetUpdate: StrataWidgetUpdate,
) {
  return db
    .updateTable("strata_widgets")
    .set(widgetUpdate)
    .where("id", "=", widgetId)
    .execute();
}
