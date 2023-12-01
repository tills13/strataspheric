import { uuidv7 } from "uuidv7";

import { NewMeeting, db } from "..";

export function createMeeting(newMeeting: Omit<NewMeeting, "id">) {
  return db
    .insertInto("meetings")
    .values({ id: uuidv7(), ...newMeeting })
    .returning("id")
    .executeTakeFirstOrThrow();
}
