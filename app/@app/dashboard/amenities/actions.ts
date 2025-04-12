"use server";

import differenceInHours from "date-fns/differenceInHours";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { createAmenity } from "../../../../data/amenities/createAmenity";
import { createAmenityBooking } from "../../../../data/amenities/createAmenityBooking";
import { getAmenity } from "../../../../data/amenities/getAmenity";
import { createEvent } from "../../../../data/events/createEvent";
import { createThreadMessage } from "../../../../data/inbox/createThreadMessage";
import { createInvoice } from "../../../../data/invoices/createInvoice";
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
  }

  revalidatePath("/dashboard/amenities");
}

// Create the Event
// create the amenitybookingevent
// create an inbox message that references the amenitybookingevent
// create a draft invoice?
// redirect to the
export async function createAmenityBookingAction(
  amenityId: string,
  fd: FormData,
) {
  const [strata, session, amenity] = await Promise.all([
    mustGetCurrentStrata(),
    auth(),
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
      },
      "BOOKING",
    );

    invoiceId = invoice.id;
  }

  const { id: amenityBookingId } = await createAmenityBooking({
    amenityId,
    eventId,
    invoiceId,
  });

  const { threadId } = await createThreadMessage({
    message: specialRequests,
    amenityBookingId,
    // invoiceId,
    strataId: strata.id,
    subject: `${amenity.name} Booking Request`,
    senderUserId: session.user.id,
  });

  let viewPath = `/dashboard/inbox/${threadId}`;
  redirect(viewPath);
}
