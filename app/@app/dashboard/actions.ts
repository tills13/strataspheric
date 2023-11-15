"use server";

import { revalidatePath } from "next/cache";
import { createWidget } from "../../../data/widgets/createWidget";
import { createEvent } from "../../../data/events/createEvent";
import { createFile } from "../../../data/files/createFile";
import { deleteWidget } from "../../../data/widgets/deleteWidget";
import { addEventToWidget } from "../../../data/widgets/addEventToWidget";
import { addFileToWidget } from "../../../data/widgets/addFileToWidget";

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

  const eventId = await createEvent(name, description, date);

  if (!eventId) {
    throw new Error("error while creating event");
  }

  await addEventToWidget(widgetId, eventId);

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

  const fileId = await createFile(name, description, (file as File).name);

  if (!fileId) {
    throw new Error("error while creating file");
  }

  await addFileToWidget(widgetId, fileId);

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
    typeof type !== "string"
  ) {
    throw new Error("invalid fields");
  }

  await createWidget(strataId, title, type);

  revalidatePath("/dashboard");
}

export async function deleteWidgetAction(widgetId: string) {
  await deleteWidget(widgetId);

  revalidatePath("/dashboard");
}
