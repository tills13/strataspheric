"use server";

import { revalidatePath } from "next/cache";

import { createEvent } from "../../../../data/events/createEvent";
import { createAndUpdloadFile } from "../../../../data/files/createAndUploadFile";
import { addEventToWidget } from "../../../../data/widgets/addEventToWidget";
import { addFileToWidget } from "../../../../data/widgets/addFileToWidget";
import { createWidget } from "../../../../data/widgets/createWidget";
import { deleteEventFromWidget } from "../../../../data/widgets/deleteEventFromWidget";
import { deleteFileFromWidget } from "../../../../data/widgets/deleteFileFromWidget";
import { deleteWidget } from "../../../../data/widgets/deleteWidget";

export async function createEventAction(widgetId: string, formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const date = formData.get("date");

  if (
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

export async function createFileAction(
  strataId: string,
  widgetId: string,
  formData: FormData,
) {
  const name = formData.get("name");
  const description = formData.get("description") || "";
  const file = formData.get("file");
  const existingFileId = formData.get("existing_file");

  let fileId: string | undefined;

  if (existingFileId && typeof existingFileId === "string") {
    fileId = existingFileId;
  } else if (file) {
    if (
      typeof name !== "string" ||
      name === "" ||
      typeof description !== "string"
    ) {
      throw new Error("invalid fields");
    }

    const newFile = await createAndUpdloadFile(
      strataId,
      name,
      description,
      (file as File).name,
      file,
    );

    fileId = newFile.id;
  }

  if (!fileId) {
    throw new Error("error while creating file");
  }

  await addFileToWidget({ widgetId, fileId });

  revalidatePath("/dashboard");
}

export async function createWidgetAction(strataId: string, formData: FormData) {
  const title = formData.get("title");
  const type = formData.get("type");

  if (
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

export async function deleteWidgetEventAction(
  widgetId: string,
  eventId: string,
) {
  await deleteEventFromWidget(widgetId, eventId);
  // revalidateTag("widget_events");
}

export async function deleteWidgetFileAction(widgetId: string, fileId: string) {
  await deleteFileFromWidget(widgetId, fileId);
}

export async function deleteWidgetAction(widgetId: string) {
  await deleteWidget(widgetId);

  revalidatePath("/dashboard");
}
