import { File, db } from "..";

export async function getRecentApprovedMinutes(
  strataId: string,
  limit: number,
  offset: number,
): Promise<File[]> {
  return db
    .selectFrom("files")
    .selectAll("files")
    .leftJoin("meeting_minutes", "files.id", "meeting_minutes.fileId")
    .leftJoin("meetings", "meeting_minutes.meetingId", "meetings.id")
    .leftJoin("events", "meetings.eventId", "events.id")
    .where("meeting_minutes.state", "=", "approved")
    .where("meetings.strataId", "=", strataId)
    .orderBy("events.endDate desc")
    .limit(limit)
    .offset(offset)
    .execute();
}
