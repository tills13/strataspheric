import { db } from "..";

export type Event = Awaited<ReturnType<typeof getEventsForRange>>[number];
export type GetEventsForRangeFilter = {
  strataId?: string;
};

export function getEventsForRange(
  startDateTimestamp: number,
  endDateTimestamp: number,
  filter: GetEventsForRangeFilter,
) {
  let query = db()
    .selectFrom("events")
    .selectAll("events")
    .leftJoin("meetings", "meetings.eventId", "events.id")
    .select("meetings.id as meetingId")
    .leftJoin(
      "amenity_bookings",
      "amenity_bookings.eventId",
      "events.id",
    )
    .leftJoin("amenities", "amenities.id", "amenity_bookings.amenityId")
    .leftJoin(
      "files as amenity_files",
      "amenities.imageFileId",
      "amenity_files.id",
    )
    .leftJoin(
      "inbox_messages",
      "inbox_messages.amenityBookingId",
      "amenity_bookings.id",
    )
    .select([
      "amenity_bookings.id as amenityBookingId",
      "amenities.name as amenityName",
      "amenities.description as amenityDescription",
      "amenity_files.path as amenityImageSrc",
      "inbox_messages.threadId as amenityBookingThreadId",
    ])

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
    );

  if (filter.strataId) {
    query = query.where("events.strataId", "=", filter.strataId);
  }

  return query
    .orderBy("events.startDate", "asc")
    .orderBy("events.endDate", "asc")
    .execute();
}
