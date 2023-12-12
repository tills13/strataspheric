import { db } from "..";

export function getMeeting(strataId: string, meetingId: string) {
  return db
    .selectFrom("meetings")
    .innerJoin("users", "meetings.callerId", "users.id")
    .innerJoin("events", "meetings.eventId", "events.id")
    .selectAll("meetings")
    .select(["users.name as caller", "events.startDate", "events.endDate"])
    .where("meetings.id", "=", meetingId)
    .where("meetings.strataId", "=", strataId)
    .executeTakeFirstOrThrow();
}
