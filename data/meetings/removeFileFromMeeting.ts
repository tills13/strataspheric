import { db } from "..";

export function removeFileFromMeeting(meetingId: string, fileId: string) {
  return db
    .deleteFrom("meeting_files")
    .where("meeting_files.meetingId", "=", meetingId)
    .where("meeting_files.fileId", "=", fileId)
    .execute();
}
