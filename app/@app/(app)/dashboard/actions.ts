"use server";

import { revalidatePath } from "next/cache";

import { createEvent } from "../../../../db/events/createEvent";
import { createFile } from "../../../../db/files/createFile";
import { addEventToWidget } from "../../../../db/widgets/addEventToWidget";
import { addFileToWidget } from "../../../../db/widgets/addFileToWidget";
import { createWidget } from "../../../../db/widgets/createWidget";
import { deleteWidget } from "../../../../db/widgets/deleteWidget";

export async function createEventAction(formData: FormData) {
  const widgetId = formData.get("widget_id");
  const name = formData.get("name");
  const description = formData.get("description");
  const date = formData.get("date");

  if (
    typeof widgetId !== "string" ||
    typeof name !== "string" ||
    name === "" ||
    typeof description !== "string" ||
    typeof date !== "string"
  ) {
    throw new Error("invalid fields");
  }

  const { id: eventId } = await createEvent({ name, description, date });

  if (!eventId) {
    throw new Error("error while creating event");
  }

  await addEventToWidget({ widgetId, eventId });

  revalidatePath("/dashboard");
}

export async function createFileAction(formData: FormData) {
  const widgetId = formData.get("widget_id");
  const name = formData.get("name");
  const description = formData.get("description") || "";
  const file = formData.get("file");

  if (
    typeof widgetId !== "string" ||
    typeof name !== "string" ||
    name === "" ||
    typeof description !== "string" ||
    file === null
  ) {
    throw new Error("invalid fields");
  }

  const { id: fileId } = await createFile({
    name,
    description,
    path: (file as File).name,
  });

  if (!fileId) {
    throw new Error("error while creating file");
  }

  await addFileToWidget({ widgetId, fileId });

  revalidatePath("/dashboard");
}

export async function createWidgetAction(formData: FormData) {
  const strataId = formData.get("strata_id");
  const title = formData.get("title");
  const type = formData.get("type");

  if (
    typeof strataId !== "string" ||
    typeof title !== "string" ||
    title === "" ||
    typeof type !== "string" ||
    !(type === "file" || type === "event")
  ) {
    throw new Error("invalid fields");
  }

  await createWidget({ strataId, title, type });

  revalidatePath("/dashboard");
}

export async function deleteWidgetAction(widgetId: string) {
  await deleteWidget(widgetId);

  revalidatePath("/dashboard");
}
