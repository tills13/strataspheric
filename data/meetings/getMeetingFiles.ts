import { db } from "..";

export function getMeetingFiles(meetingId: string) {
  return db
    .selectFrom("meeting_files")
    .innerJoin("files", "files.id", "meeting_files.fileId")
    .selectAll(["meeting_files", "files"])
    .where("meeting_files.meetingId", "=", meetingId)
    .execute();
}
