import { db } from "..";

export function removeMeetingAttendee(meetingId: string, userId: string) {
  return db()
    .deleteFrom("meeting_attendees")
    .where("meetingId", "=", meetingId)
    .where("userId", "=", userId)
    .execute();
}
