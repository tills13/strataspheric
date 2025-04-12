import { db } from "..";
import { Amenity } from "./getAmenity";

export type AmenityBooking = Awaited<ReturnType<typeof getAmenityBooking>>;

export async function getAmenityBooking(amenityBookingId: string) {
  const row = await db
    .selectFrom("amenity_bookings")
    .innerJoin("events", "amenity_bookings.eventId", "events.id")
    .innerJoin("amenities", "amenity_bookings.amenityId", "amenities.id")
    .innerJoin("files", "amenities.imageFileId", "files.id")
    .innerJoin("invoices", "amenity_bookings.invoiceId", "invoices.id")
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
    ])
    .where("amenity_bookings.id", "=", amenityBookingId)
    .executeTakeFirstOrThrow();

  return {
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
  };
}
