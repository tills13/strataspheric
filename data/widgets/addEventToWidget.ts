import { prepare } from "../../db";

export function addEventToWidget(widgetId: string, eventId: string) {
  return prepare`INSERT INTO widget_events (widget_id, event_id) VALUES (?, ?)`
    .bind(widgetId, eventId)
    .run();
}
