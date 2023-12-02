import { db } from "..";

export function addFileToMeeting(meetingId: string, fileId: string) {
  return db.insertInto("meeting_files").values({ meetingId, fileId }).execute();
}
