import { db } from "..";

export function addMinutesToMeeting(meetingId: string, fileId: string) {
  return db
    .insertInto("meeting_minutes")
    .values({ meetingId, fileId, state: "draft" })
    .execute();
}
