"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../../auth";
import { createEvent } from "../../../../../../data/events/createEvent";
import * as formdata from "../../../../../../utils/formdata";

export async function createEventAction(strataId: string, formData: FormData) {
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
