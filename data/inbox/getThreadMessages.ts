import { File, Invoice, db } from "..";
import { AmenityBooking } from "../amenities/getAmenityBooking";

export async function getThreadMessages(
  threadId: string,
  viewId?: string | undefined,
) {
  let query = db
    .selectFrom("inbox_messages")
    .leftJoin("users", "inbox_messages.senderUserId", "users.id")
    .leftJoin("files", "inbox_messages.fileId", "files.id")
    .leftJoin("invoices", "inbox_messages.invoiceId", "invoices.id")
    .leftJoin(
      "amenity_bookings",
      "inbox_messages.amenityBookingId",
      "amenity_bookings.id",
    )
    .leftJoin("events", "amenity_bookings.eventId", "events.id")
    .leftJoin("amenities", "amenity_bookings.amenityId", "amenities.id")
    .leftJoin(
      "files as amenity_files",
      "amenities.imageFileId",
      "amenity_files.id",
    )
    .leftJoin(
      "invoices as amenity_booking_invoices",
      "amenity_bookings.invoiceId",
      "amenity_booking_invoices.id",
    )
    .select((eb) => [
      "inbox_messages.id",
      "inbox_messages.subject",
      "inbox_messages.message",
      "inbox_messages.threadId",
      "inbox_messages.viewId",
      "inbox_messages.isUnread",
      "inbox_messages.sentAt",
      "inbox_messages.senderUserId",
      "inbox_messages.senderPhoneNumber",
      "inbox_messages.strataId",
      "inbox_messages.fileId",

      "files.createdAt as fileCreatedAt",
      "files.description as fileDescription",
      "files.id as fileId",
      "files.isPublic as fileIsPublic",
      "files.name as fileName",
      "files.path as filePath",
      "files.sizeBytes as fileSizeBytes",
      "files.strataId as fileStrataId",
      "files.uploaderId as fileUploaderId",

      "invoices.amount as invoiceAmount",
      "invoices.createdAt as invoiceCreatedAt",
      "invoices.description as invoiceDescription",
      "invoices.dueBy as invoiceDueBy",
      "invoices.fileId as invoiceFileId",
      "invoices.id as invoiceId",
      "invoices.identifier as invoiceIdentifier",
      "invoices.isPaid as invoiceIsPaid",
      "invoices.strataId as invoiceStrataId",
      "invoices.status as invoiceStatus",
      "invoices.type as invoiveType",

      // amenity bookings
      "amenity_bookings.id as amenityBookingId",
      "amenity_bookings.decision as amenityBookingDecision",
      // amenity booking invoice
      "amenity_booking_invoices.id as amenityBookingInvoiceId",
      "amenity_booking_invoices.identifier as amenityBookingInvoiceIdentifier",
      "amenity_booking_invoices.amount as amenityBookingInvoiceAmount",
      "amenity_booking_invoices.status as amenityBookingInvoiceStatus",
      // amenity booking event
      "events.startDate as amenityBookingStartDate",
      "events.endDate as amenityBookingEndDate",
      // amenity bookings amenity
      "amenities.id as amenityId",
      "amenities.name as amenityName",
      "amenities.description as amenityDescription",
      "amenities.status as amenityStatus",
      "amenities.costPerHour as amenityCostPerHour",
      "amenity_files.path as amenityImageSrc",

      eb.fn
        .coalesce("users.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("users.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
    ])
    .where("inbox_messages.threadId", "=", threadId);

  if (viewId) {
    query = query.where("inbox_messages.viewId", "=", viewId);
  }

  const result = await query.orderBy("inbox_messages.sentAt asc").execute();

  return result.map(
    ({
      fileCreatedAt,
      fileDescription,
      fileId,
      fileIsPublic,
      fileName,
      filePath,
      fileSizeBytes,
      fileStrataId,
      fileUploaderId,

      invoiceAmount,
      invoiceCreatedAt,
      invoiceDescription,
      invoiceDueBy,
      invoiceFileId,
      invoiceId,
      invoiceIdentifier,
      invoiceIsPaid,
      invoiceStrataId,
      invoiceStatus,
      invoiveType,

      amenityBookingId,
      amenityBookingDecision,
      amenityBookingInvoiceId,
      amenityBookingInvoiceIdentifier,
      amenityBookingInvoiceAmount,
      amenityBookingInvoiceStatus,
      amenityBookingEndDate,
      amenityBookingStartDate,
      amenityCostPerHour,
      amenityDescription,
      amenityId,
      amenityImageSrc,
      amenityName,
      amenityStatus,

      ...rest
    }) => {
      return {
        ...rest,
        amenityBooking: amenityBookingId
          ? ({
              id: amenityBookingId,
              decision: amenityBookingDecision,
              invoice: amenityBookingInvoiceId
                ? {
                    id: amenityBookingInvoiceId!,
                    identifier: amenityBookingInvoiceIdentifier!,
                    amount: amenityBookingInvoiceAmount!,
                    status: amenityBookingInvoiceStatus!,
                  }
                : undefined,
              startDate: amenityBookingStartDate,
              endDate: amenityBookingEndDate,
              amenity: {
                id: amenityId,
                name: amenityName,
                description: amenityDescription,
                costPerHour: amenityCostPerHour,
                status: amenityStatus,
                imageSrc: amenityImageSrc,
              },
            } as AmenityBooking)
          : undefined,
        file: fileId
          ? ({
              createdAt: fileCreatedAt,
              description: fileDescription,
              id: fileId,
              isPublic: fileIsPublic,
              name: fileName,
              path: filePath,
              sizeBytes: fileSizeBytes,
              strataId: fileStrataId,
              uploaderId: fileUploaderId,
            } as File)
          : undefined,
        invoice: invoiceId
          ? ({
              amount: invoiceAmount,
              createdAt: invoiceCreatedAt,
              description: invoiceDescription,
              dueBy: invoiceDueBy,
              fileId: invoiceFileId,
              id: invoiceId,
              identifier: invoiceIdentifier,
              isPaid: invoiceIsPaid,
              strataId: invoiceStrataId,
              status: invoiceStatus,
              type: invoiveType,
            } as Invoice)
          : undefined,
      };
    },
  );
}
