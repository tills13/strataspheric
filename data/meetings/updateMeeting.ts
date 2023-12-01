import { MeetingUpdate, db } from "..";

export async function updateMeeting(
  meetingId: string,
  meetingUpdate: MeetingUpdate,
) {
  return db
    .updateTable("meetings")
    .set(meetingUpdate)
    .where("meetings.id", "=", meetingId)
    .execute();
}
