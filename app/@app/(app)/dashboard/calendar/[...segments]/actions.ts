"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../../auth";
import { createEvent } from "../../../../../../data/events/createEvent";
import { deleteEvent } from "../../../../../../data/events/deleteEvent";
import { getEvent } from "../../../../../../data/events/getEvent";
import * as formdata from "../../../../../../utils/formdata";

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
  const date = formdata.getString(formData, "date");

  if (name === "") {
    throw new Error("invalid fields");
  }

  await createEvent({
    name,
    description,
    date,
    strataId,
    creatorId: session.user.id,
  });

  const d = new Date(date);

  revalidatePath(
    "/dashboard/calendar/" + d.getFullYear() + "/" + (d.getMonth() + 1),
  );
}

export async function deleteEventAction(eventId: string) {
  console.log("delete");
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const e = await getEvent(eventId);
  console.log(e);

  if (!e) {
    return;
  }

  const d = new Date(e.date);

  await deleteEvent(eventId);

  revalidatePath(
    "/dashboard/calendar/" + d.getFullYear() + "/" + (d.getMonth() + 1),
  );
}
