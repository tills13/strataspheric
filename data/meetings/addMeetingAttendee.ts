import { db } from "..";

export function addMeetingAttendee(meetingId: string, userId: string) {
  return db()
    .insertInto("meeting_attendees")
    .values({ meetingId, userId, status: "invited" })
    .onConflict((oc) => oc.doNothing())
    .execute();
}
