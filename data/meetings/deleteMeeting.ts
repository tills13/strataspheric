import { db } from "..";

export function deleteMeeting(meetingId: string) {
  return db.transaction().execute(async (trx) => {
    await trx
      .deleteFrom("events")
      .where("events.id", "=", (eb) =>
        eb
          .selectFrom("meetings")
          .select("eventId")
          .where("meetings.id", "=", meetingId),
      )
      .execute();

    await trx
      .deleteFrom("meeting_agenda_items")
      .where("meeting_agenda_items.meetingId", "=", meetingId)
      .execute();

    await trx
      .deleteFrom("meeting_files")
      .where("meeting_files.meetingId", "=", meetingId)
      .execute();

    await trx
      .deleteFrom("meetings")
      .where("meetings.id", "=", meetingId)
      .execute();

    return trx;
  });
}
