import { uuidv7 } from "uuidv7";

import { Event, NewEvent, db } from "..";

export async function createEvent(
  newEvent: Omit<NewEvent, "id">,
): Promise<Event> {
  return db
    .insertInto("events")
    .values({
      id: uuidv7(),
      ...newEvent,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
