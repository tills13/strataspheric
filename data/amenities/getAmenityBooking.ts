import { db } from "..";
import { Amenity } from "./getAmenity";

export type AmenityBooking = Awaited<ReturnType<typeof getAmenityBooking>>;

export const baseQuery = db
  .selectFrom("amenity_bookings")
  .innerJoin("events", "amenity_bookings.eventId", "events.id")
  .innerJoin("amenities", "amenity_bookings.amenityId", "amenities.id")
  .innerJoin("files", "amenities.imageFileId", "files.id")
  .leftJoin("invoices", "amenity_bookings.invoiceId", "invoices.id")
  .leftJoin("users", "amenity_bookings.deciderId", "users.id")
  .selectAll("amenities")
  .select([
    // amenity bookings
    "amenity_bookings.id as amenityBookingId",
    "amenity_bookings.decision as amenityBookingDecision",

    // decider
    "users.id as deciderId",
    "users.name as deciderName",
    "users.email as deciderEmail",

    // amenity booking invoice
    "invoices.id as amenityBookingInvoiceId",
    "invoices.identifier as amenityBookingInvoiceIdentifier",
    "invoices.amount as amenityBookingInvoiceAmount",
    "invoices.status as amenityBookingInvoiceStatus",
    "invoices.description as amenityBookingInvoiceDescription",
    "invoices.isPaid as amenityBookingInvoiceIsPaid",

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
    "files.name as amenityImageName",
  ]);

type Row = Awaited<ReturnType<(typeof baseQuery)["executeTakeFirstOrThrow"]>>;

export function processRows(...rows: Row[]) {
  return rows.map((row) => ({
    id: row.amenityBookingId,
    decision: row.amenityBookingDecision,
    decider: row.deciderId
      ? {
          id: row.deciderId!,
          name: row.deciderName!,
          email: row.deciderEmail!,
        }
      : undefined,
    invoice: row.amenityBookingInvoiceId
      ? {
          id: row.amenityBookingInvoiceId!,
          identifier: row.amenityBookingInvoiceIdentifier!,
          amount: row.amenityBookingInvoiceAmount!,
          status: row.amenityBookingInvoiceStatus!,
          description: row.amenityBookingInvoiceDescription!,
          isPaid: row.amenityBookingInvoiceIsPaid!,
        }
      : undefined,
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
      imageName: row.amenityImageName,
      strataId: row.strataId,
    } satisfies Amenity,
  }));
}

export async function getAmenityBooking(amenityBookingId: string) {
  const row = await baseQuery
    .where("amenity_bookings.id", "=", amenityBookingId)
    .executeTakeFirstOrThrow();

  return processRows(row)[0];
}
