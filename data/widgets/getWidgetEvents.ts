import { prepare } from "../../db";
import { Event } from "../events";

export async function getWidgetEvents(
  widgetId: string,
  limit: number,
  offset: number
) {
  const result = await prepare`
        SELECT 
            events.id,
            events.name,
            events.description,
            events.date
        FROM widget_events
        LEFT JOIN events ON widget_events.event_id = events.id
        WHERE widget_id = ?
        ORDER BY date DESC
        LIMIT ?
        OFFSET ?
    `
    .bind(widgetId, limit, offset)
    .all<Event>();

  return result.results;
}
