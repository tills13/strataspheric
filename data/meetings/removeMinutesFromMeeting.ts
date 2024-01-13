import { db } from "..";

export function removeMinutesFromMeeting(meetingId: string, fileId: string) {
  return db
    .deleteFrom("meeting_minutes")
    .where("meeting_minutes.meetingId", "=", meetingId)
    .where("meeting_minutes.fileId", "=", fileId)
    .execute();
}
