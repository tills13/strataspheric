import { db } from "..";

export async function getEvent(eventId: string) {
  return db
    .selectFrom("events")
    .selectAll()
    .where("events.id", "=", eventId)
    .executeTakeFirst();
}
