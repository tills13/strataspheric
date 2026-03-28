import { db } from "..";

export function listMeetingAttendees(meetingId: string) {
  return db()
    .selectFrom("meeting_attendees")
    .innerJoin("users", "users.id", "meeting_attendees.userId")
    .select([
      "meeting_attendees.meetingId",
      "meeting_attendees.userId",
      "meeting_attendees.status",
      "meeting_attendees.respondedAt",
      "users.name",
      "users.email",
    ])
    .where("meeting_attendees.meetingId", "=", meetingId)
    .execute();
}

export type MeetingAttendeeWithUser = Awaited<ReturnType<typeof listMeetingAttendees>>[number];
