import { db } from "..";

export function getMeeting(strataId: string, meetingId: string) {
  return db
    .selectFrom("meetings")
    .innerJoin("users", "meetings.callerId", "users.id")
    .selectAll("meetings")
    .select(["users.name as caller"])
    .where("meetings.id", "=", meetingId)
    .where("meetings.strataId", "=", strataId)
    .executeTakeFirstOrThrow();
}
