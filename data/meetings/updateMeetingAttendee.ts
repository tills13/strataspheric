import { MeetingAttendeeUpdate, db } from "..";

export function updateMeetingAttendee(
  meetingId: string,
  userId: string,
  update: MeetingAttendeeUpdate,
) {
  return db()
    .updateTable("meeting_attendees")
    .set(update)
    .where("meetingId", "=", meetingId)
    .where("userId", "=", userId)
    .execute();
}
