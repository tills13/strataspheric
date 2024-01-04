"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../../../auth";
import { createEvent } from "../../../../../../../data/events/createEvent";
import { deleteEvent } from "../../../../../../../data/events/deleteEvent";
import { getEvent } from "../../../../../../../data/events/getEvent";
import { updateEvent } from "../../../../../../../data/events/updateEvent";
import { parseTimestamp } from "../../../../../../../utils/datetime";
import * as formdata from "../../../../../../../utils/formdata";

export async function upsertEventAction(
  strataId: string,
  eventId: string | undefined,
  formData: FormData,
) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description");

  const startDateTs = formdata.getTimestamp(formData, "startDate");
  const endDateTs = formdata.getTimestamp(formData, "endDate") || startDateTs;

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
      strataId,
      creatorId: session.user.id,
    });

    eventId = event.id;
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
