import { db } from "..";

export type StrataEvent = Awaited<ReturnType<typeof getStrataEventsForRange>>;

export function getStrataEventsForRange(
  strataId: string,
  startDateTimestamp: number,
  endDateTimestamp: number,
) {
  return db
    .selectFrom("events")
    .selectAll("events")
    .leftJoin("meetings", "meetings.eventId", "events.id")
    .select("meetings.id as meetingId")
    .where("events.strataId", "=", strataId)
    .where((eb) =>
      eb.or([
        // startDate is before startDateTimestamp but endDate is during startDateTimestamp or after endDateTimestamp
        eb.and([
          eb("events.startDate", "<", startDateTimestamp),
          eb.or([
            eb("events.endDate", ">", endDateTimestamp),
            eb.between("events.endDate", startDateTimestamp, endDateTimestamp),
          ]),
        ]),

        // start date is during startDateTimestamp -> endDateTimestamp
        eb.between("events.startDate", startDateTimestamp, endDateTimestamp),
      ]),
    )
    .orderBy("events.startDate", "asc")
    .orderBy("events.endDate", "asc")
    .execute();
}
