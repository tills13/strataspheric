import { EventUpdate, db } from "..";

export async function updateEvent(eventId: string, event: EventUpdate) {
  return db
    .updateTable("events")
    .set(event)
    .where("events.id", "=", eventId)
    .execute();
}
