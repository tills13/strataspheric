"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import { createEvent } from "../../../../../data/events/createEvent";
import { deleteEvent } from "../../../../../data/events/deleteEvent";
import { getEvent } from "../../../../../data/events/getEvent";
import { updateEvent } from "../../../../../data/events/updateEvent";
import { listStrataMemberships } from "../../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { assertCan } from "../../../../../data/users/permissions";
import { parseTimestamp } from "../../../../../utils/datetime";
import * as formdata from "../../../../../utils/formdata";
import { sendNotification } from "../../../../../utils/notifications";

export async function upsertEventAction(
  eventId: string | undefined,
  formData: FormData,
) {
  const strata = await mustGetCurrentStrata();
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  assertCan(
    session.user,
    eventId ? "stratas.events.edit" : "stratas.events.create",
  );

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description");

  const startDateTs = formdata.getTimestamp(formData, "date_start");
  const endDateTs = formdata.getTimestamp(formData, "date_end") || startDateTs;

  const d = parseTimestamp(startDateTs);

  if (eventId) {
    await updateEvent(eventId, {
      name,
      description,
      startDate: startDateTs,
      endDate: endDateTs,
    });
  } else {
    if (name === "") {
      throw new Error("invalid fields");
    }

    const event = await createEvent({
      name,
      description,
      startDate: startDateTs,
      endDate: endDateTs,
      strataId: strata.id,
      creatorId: session.user.id,
    });

    eventId = event.id;

    // Notify members who opted into event notifications
    const members = await listStrataMemberships({ strataId: strata.id });
    const notifyEmails = members
      .filter((m) => m.notifyEvents)
      .map((m) => m.email);

    if (notifyEmails.length > 0) {
      const startDate = parseTimestamp(startDateTs);
      const formattedDate = startDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      await sendNotification({
        to: notifyEmails,
        subject: `New Event: ${name}`,
        html: `
          <h2>${name}</h2>
          <p>${description || "No description provided."}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
        `,
      });
    }
  }

  // @todo invalidate all months between start and end date
  revalidatePath(
    "/dashboard/calendar/" + d.getFullYear() + "/" + (d.getMonth() + 1),
  );

  return eventId;
}

export async function deleteEventAction(eventId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  assertCan(session.user, "stratas.events.delete");

  const e = await getEvent(eventId);

  if (!e) {
    return;
  }

  await deleteEvent(eventId);

  const d = new Date(e.startDate);
  // @todo invalidate all months between start and end date
  revalidatePath(
    "/dashboard/calendar/" + d.getFullYear() + "/" + (d.getMonth() + 1),
  );
}
