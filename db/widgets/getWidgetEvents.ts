import { unstable_cache } from "next/cache";

import { type Event, db } from "..";

export const getWidgetEvents = unstable_cache(
  (widgetId: string, limit: number, offset: number): Promise<Event[]> => {
    return db
      .selectFrom("events")
      .selectAll("events")
      .innerJoin("widget_events", "events.id", "widget_events.eventId")
      .where("widget_events.widgetId", "=", widgetId)
      .limit(limit)
      .offset(offset)
      .execute();
  },
  ["widget_events"],
  {
    tags: ["widget_events"],
  },
);
