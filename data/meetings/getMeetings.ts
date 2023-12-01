import { db } from "..";

export function getMeetings(strataId: string) {
  return db
    .selectFrom("meetings")
    .innerJoin("users", "meetings.callerId", "users.id")
    .selectAll("meetings")
    .select(["users.name as caller"])
    .where("meetings.strataId", "=", strataId)
    .execute();
}
