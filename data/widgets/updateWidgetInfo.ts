import { WidgetInfoUpdate, db } from "..";

export function updateWidgetInfo(
  widgetId: string,
  widgetInfoUpdate: WidgetInfoUpdate,
) {
  return db
    .updateTable("widget_info")
    .set(widgetInfoUpdate)
    .where("widget_info.widgetId", "=", widgetId)
    .execute();
}
