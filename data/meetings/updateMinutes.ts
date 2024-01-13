import { MeetingMinutesUpdate, db } from "..";

export function updateMinutes(
  meetingId: string,
  fileId: string,
  meetingMinutesUpdate: MeetingMinutesUpdate,
) {
  return db
    .updateTable("meeting_minutes")
    .set(meetingMinutesUpdate)
    .where("meeting_minutes.meetingId", "=", meetingId)
    .where("meeting_minutes.fileId", "=", fileId)
    .execute();
}
