"use server";

import differenceInHours from "date-fns/differenceInHours";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, mustAuth } from "../../../../auth";
import { createAmenity } from "../../../../data/amenities/createAmenity";
import { createAmenityBooking } from "../../../../data/amenities/createAmenityBooking";
import { getAmenity } from "../../../../data/amenities/getAmenity";
import { getAmenityBooking } from "../../../../data/amenities/getAmenityBooking";
import { updateAmenity } from "../../../../data/amenities/updateAmenity";
import { updateAmenityBooking } from "../../../../data/amenities/updateAmenityBooking";
import { createEvent } from "../../../../data/events/createEvent";
import { createThreadMessage } from "../../../../data/inbox/createThreadMessage";
import { listThreads } from "../../../../data/inbox/listThreads";
import { createInvoice } from "../../../../data/invoices/createInvoice";
import { deleteInvoice } from "../../../../data/invoices/deleteInvoice";
import { updateInvoice } from "../../../../data/invoices/updateInvoice";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { parseTimestamp } from "../../../../utils/datetime";
import * as formdata from "../../../../utils/formdata";

export async function upsertAmenityAction(
  amenityId: string | undefined,
  fd: FormData,
) {
  const session = await auth();

  if (!can(session?.user, p("stratas", "amenities", "create"))) {
    throw new Error("not allowed");
  }

  const name = formdata.getString(fd, "name");
  const description = formdata.getString(fd, "description");
  const imageFileId = formdata.getString(fd, "imageFileId");
  const costPerHour = formdata.getFloat(fd, "costPerHour");

  if (!amenityId) {
    const strata = await mustGetCurrentStrata();

    await createAmenity({
      description,
      imageFileId,
      name,
      status: "active",
      costPerHour,
      strataId: strata.id,
    });
  } else {
    await updateAmenity(amenityId, {
      costPerHour,
      description,
      imageFileId,
      name,
    });
  }

  revalidatePath("/dashboard/amenities");
}

export async function approveOrRejectAmenityBookingAction(
  amenityBookingId: string,
  decision: "approve" | "reject",
) {
  const [session, strata, amenityBooking] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
    getAmenityBooking(amenityBookingId),
  ]);

  if (!can(session.user, "stratas.amenity_bookings.edit")) {
    throw new Error("unauthorized");
  }

  const {
    results: [thread],
  } = await listThreads({ amenityBookingId: amenityBooking.id });

  if (!thread) {
    throw new Error("oops, something went wrong");
  }

  if (decision === "reject") {
    if (amenityBooking.invoice) {
      await deleteInvoice(amenityBooking.invoice.id);
    }

    await updateAmenityBooking(amenityBooking.id, {
      invoiceId: null,
      decision: "rejected",
      deciderId: session.user.id,
    });

    await createThreadMessage({
      subject: "",
      senderName: "Strataspheric",
      strataId: strata.id,
      threadId: thread.threadId,
      message: `Sorry, your booking request has been denied. Someone may follow up in a different message to provide more detail or you may respond to this thread to get more information.`,
    });
  } else {
    await updateAmenityBooking(amenityBooking.id, {
      decision: "approved",
      deciderId: session.user.id,
    });

    if (amenityBooking.invoice) {
      await updateInvoice(amenityBooking.invoice.id, { status: "final" });
    }

    await createThreadMessage({
      subject: "",
      senderName: "Strataspheric",
      strataId: strata.id,
      threadId: thread.threadId,
      message:
        `Your booking request has been approved.` +
        (amenityBooking.invoice
          ? " Please pay the invoice by the booking's start date."
          : ""),
      invoiceId: amenityBooking.invoice?.id,
    });
  }

  revalidatePath(`/dashboard/inbox/${thread.threadId}`);
}

export async function createAmenityBookingAction(
  amenityId: string,
  fd: FormData,
) {
  const [strata, session, amenity] = await Promise.all([
    mustGetCurrentStrata(),
    mustAuth(),
    getAmenity(amenityId),
  ]);

  const specialRequests = formdata.getString(fd, "specialRequests");
  const startDate = formdata.getTimestamp(fd, "startDate");
  const endDate = formdata.getTimestamp(fd, "endDate");

  const { id: eventId } = await createEvent({
    name: `${amenity.name} Booking - ${session.user.name}`,
    description: "",
    startDate,
    endDate,
    strataId: strata.id,
    creatorId: session.user.id,
  });

  let invoiceId: string | undefined;

  if (amenity.costPerHour) {
    const numHours = differenceInHours(
      parseTimestamp(endDate),
      parseTimestamp(startDate),
    );
    const amount = numHours * amenity.costPerHour;

    const invoice = await createInvoice(
      {
        amount,
        status: "draft",
        strataId: strata.id,
        type: "incoming",
        dueBy: startDate,
        updatedAt: new Date().getTime(),
      },
      "BOOKING",
    );

    invoiceId = invoice.id;
  }

  const { id: amenityBookingId } = await createAmenityBooking({
    amenityId,
    eventId,
    invoiceId,
    requesterId: session.user.id,
  });

  const { threadId } = await createThreadMessage({
    message: specialRequests,
    amenityBookingId,
    // invoiceId,
    strataId: strata.id,
    subject: `${amenity.name} Booking Request`,
    senderUserId: session.user.id,
  });

  redirect(`/dashboard/inbox/${threadId}`);
}
