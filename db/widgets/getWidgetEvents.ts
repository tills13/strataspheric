import { type Event, db } from "..";

export function getWidgetEvents(
  widgetId: string,
  limit: number,
  offset: number,
): Promise<Event[]> {
  return db
    .selectFrom("events")
    .selectAll("events")
    .innerJoin("widget_events", "events.id", "widget_events.eventId")
    .where("widget_events.widgetId", "=", widgetId)
    .limit(limit)
    .offset(offset)
    .execute();
}
