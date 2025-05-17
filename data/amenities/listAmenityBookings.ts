import { AmenityBooking, baseQuery, processRows } from "./getAmenityBooking";

type ListAmenityBookingsFilter = {
  amenityId?: string;
  invoiceId?: string;
  decision?: AmenityBooking["decision"];
  startTs?: number;
  endTs?: number;
};

export async function listAmenityBookings(filter: ListAmenityBookingsFilter) {
  let query = baseQuery;

  if (filter.decision) {
    query = query.where("amenity_bookings.decision", "=", filter.decision);
  }

  if (filter.amenityId) {
    query = query.where("amenity_bookings.amenityId", "=", filter.amenityId);
  }

  if (filter.invoiceId) {
    query = query.where("amenity_bookings.invoiceId", "=", filter.invoiceId);
  }

  query = query.where((eb) =>
    eb.or([
      // startDate is before startDateTimestamp but endDate is during startDateTimestamp or after filter.endTs
      eb.and([
        filter.startTs
          ? eb("events.startDate", "<", filter.startTs)
          : eb.lit(true),
        eb.or([
          filter.endTs ? eb("events.endDate", ">", filter.endTs) : eb.lit(true),
          filter.startTs && filter.endTs
            ? eb.between("events.endDate", filter.startTs, filter.endTs)
            : eb.lit(true),
        ]),
      ]),

      // start date is during filter.startTs -> filter.endTs
      filter.startTs && filter.endTs
        ? eb.between("events.startDate", filter.startTs, filter.endTs)
        : eb.lit(true),
    ]),
  );

  query = query
    .orderBy("events.startDate", "asc")
    .orderBy("events.endDate", "asc");

  return processRows(...(await query.execute()));
}
