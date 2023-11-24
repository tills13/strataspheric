import { db } from "..";

export function deleteEventFromWidget(widgetId: string, eventId: string) {
  return db
    .deleteFrom("widget_events")
    .where("widget_events.eventId", "=", eventId)
    .where("widget_events.widgetId", "=", widgetId)
    .execute();
}
