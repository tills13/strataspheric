import { db } from "..";

export async function deleteEvent(eventId: string) {
  return db.deleteFrom("events").where("events.id", "=", eventId).execute();
}
