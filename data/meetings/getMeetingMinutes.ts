import { db } from "..";

export type MeetingMinutes = Awaited<ReturnType<typeof getMeetingMinutes>>[0];

export function getMeetingMinutes(meetingId: string) {
  return db
    .selectFrom("meeting_minutes")
    .innerJoin("files", "files.id", "meeting_minutes.fileId")
    .leftJoin("users", "users.id", "meeting_minutes.approverId")
    .selectAll(["meeting_minutes", "files"])
    .select("users.name as approverName")
    .where("meeting_minutes.meetingId", "=", meetingId)
    .orderBy("files.createdAt asc")
    .execute();
}
