import { db } from "..";

export async function deleteAllEvents(strataId: string) {
  return db
    .deleteFrom("events")
    .where("events.strataId", "=", strataId)
    .execute();
}
