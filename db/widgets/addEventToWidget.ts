import { NewWidgetEvent, db } from "..";

export function addEventToWidget(widgetEvent: NewWidgetEvent) {
  return db.insertInto("widget_events").values(widgetEvent).execute();
}
