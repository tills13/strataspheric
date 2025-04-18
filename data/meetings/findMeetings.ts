import { db } from "..";

export function findMeetings(strataId: string) {
  return db
    .selectFrom("meetings")
    .innerJoin("users", "meetings.callerId", "users.id")
    .innerJoin("events", "meetings.eventId", "events.id")
    .selectAll("meetings")
    .select(["users.name as caller", "events.startDate", "events.endDate"])
    .where("meetings.strataId", "=", strataId)
    .orderBy("events.startDate desc")
    .execute();
}
