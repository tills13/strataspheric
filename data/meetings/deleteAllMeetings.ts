import { db } from "..";

export function deleteAllMeetings(strataId: string) {
  return db.transaction().execute(async (trx) => {
    await trx
      .deleteFrom("events")
      .where("events.id", "in", (eb) =>
        eb
          .selectFrom("meetings")
          .select("eventId")
          .where("meetings.id", "in", (eb) =>
            eb
              .selectFrom("meetings")
              .select("meetings.id")
              .where("meetings.strataId", "=", strataId),
          ),
      )
      .execute();

    await trx
      .deleteFrom("meeting_agenda_items")
      .where("meeting_agenda_items.meetingId", "in", (eb) =>
        eb
          .selectFrom("meetings")
          .select("meetings.id")
          .where("meetings.strataId", "=", strataId),
      )
      .execute();

    await trx
      .deleteFrom("meeting_files")
      .where("meeting_files.meetingId", "in", (eb) =>
        eb
          .selectFrom("meetings")
          .select("meetings.id")
          .where("meetings.strataId", "=", strataId),
      )
      .execute();

    await trx
      .deleteFrom("meetings")
      .where("meetings.strataId", "=", strataId)
      .execute();

    return trx;
  });
}
