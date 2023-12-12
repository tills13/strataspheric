import { db } from "..";

export function getMeetingMinutes(meetingId: string) {
  // return db
  //   .selectFrom("meeting_minutes")
  //   .innerJoin("files", "files.id", "meeting_minutes.fileId")
  //   .selectAll(["meeting_minutes", "files"])
  //   .where("meeting_minutes.meetingId", "=", meetingId)
  // .execute();
}
