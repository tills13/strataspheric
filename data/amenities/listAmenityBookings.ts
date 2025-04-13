import { db } from "..";
import { Amenity } from "./getAmenity";
import { AmenityBooking } from "./getAmenityBooking";

type ListAmenityBookingsFilter = {
  amenityId?: string;
  decision?: AmenityBooking["decision"];
  startTs?: number;
  endTs?: number;
};

export async function listAmenityBookings(filter: ListAmenityBookingsFilter) {
  let query = db
    .selectFrom("amenity_bookings")
    .innerJoin("events", "amenity_bookings.eventId", "events.id")
    .innerJoin("amenities", "amenity_bookings.amenityId", "amenities.id")
    .innerJoin("files", "amenities.imageFileId", "files.id")
    .leftJoin("invoices", "amenity_bookings.invoiceId", "invoices.id")
    .selectAll("amenities")
    .select([
      // amenity bookings
      "amenity_bookings.id as amenityBookingId",
      // amenity booking invoice
      "invoices.id as amenityBookingInvoiceId",
      "invoices.identifier as amenityBookingInvoiceIdentifier",
      "invoices.amount as amenityBookingInvoiceAmount",
      "invoices.status as amenityBookingInvoiceStatus",
      // amenity booking event
      "events.startDate as amenityBookingStartDate",
      "events.endDate as amenityBookingEndDate",
      // amenity bookings amenity
      "amenities.id as amenityId",
      "amenities.name as amenityName",
      "amenities.description as amenityDescription",
      "amenities.status as amenityStatus",
      "amenities.costPerHour as amenityCostPerHour",
      "files.path as amenityImageSrc",
    ]);

  if (filter.decision) {
    query = query.where("amenity_bookings.decision", "=", filter.decision);
  }

  if (filter.amenityId) {
    query = query.where("amenity_bookings.amenityId", "=", filter.amenityId);
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

  const rows = await query.execute();

  return rows.map((row) => ({
    id: row.amenityBookingId,
    invoice: {
      id: row.amenityBookingInvoiceId,
      identifier: row.amenityBookingInvoiceIdentifier,
      amount: row.amenityBookingInvoiceAmount,
      status: row.amenityBookingInvoiceStatus,
    },
    startDate: row.amenityBookingStartDate,
    endDate: row.amenityBookingEndDate,
    amenity: {
      id: row.amenityId,
      name: row.amenityName,
      description: row.amenityDescription,
      costPerHour: row.amenityCostPerHour,
      status: row.amenityStatus,
      imageSrc: row.amenityImageSrc,
      imageFileId: row.imageFileId,
      strataId: row.strataId,
    } satisfies Amenity,
  }));
}
