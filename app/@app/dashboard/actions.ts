"use server";

import { revalidatePath } from "next/cache";

import { mustAuth } from "../../../auth";
import { StrataWidget } from "../../../data";
import { createEvent } from "../../../data/events/createEvent";
import { createAndUploadFile } from "../../../data/files/createAndUploadFile";
import { addEventToWidget } from "../../../data/widgets/addEventToWidget";
import { addFileToWidget } from "../../../data/widgets/addFileToWidget";
import { createWidget } from "../../../data/widgets/createWidget";
import { createWidgetInfo } from "../../../data/widgets/createWidgetInfo";
import { deleteEventFromWidget } from "../../../data/widgets/deleteEventFromWidget";
import { deleteFileFromWidget } from "../../../data/widgets/deleteFileFromWidget";
import { deleteWidget } from "../../../data/widgets/deleteWidget";
import { updateWidget } from "../../../data/widgets/updateWidget";
import { updateWidgetInfo } from "../../../data/widgets/updateWidgetInfo";
import * as formdata from "../../../utils/formdata";

export async function createEventAction(
  strataId: string,
  widgetId: string,
  formData: FormData,
) {
  const session = await mustAuth();

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description");
  const startDate = formdata.getTimestamp(formData, "date");

  if (name === "") {
    throw new Error("invalid fields");
  }

  const { id: eventId } = await createEvent({
    name,
    description,
    startDate,
    endDate: startDate,
    strataId,
    creatorId: session.user.id,
  });

  if (!eventId) {
    throw new Error("error while creating event");
  }

  await addEventToWidget({ widgetId, eventId });

  revalidatePath("/dashboard");
}

export async function upsertFileWidgetFileAction(
  strataId: string,
  widgetId: string,
  formData: FormData,
) {
  const session = await mustAuth();

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description") || "";
  const file = formdata.getFile(formData, "file");
  const existingFileId = formdata.getString(formData, "existing_file");
  const isPublic =
    formdata.getEnum(formData, "is_public", ["private", "public"]) === "public";

  let fileId: string | undefined;

  if (existingFileId && typeof existingFileId === "string") {
    fileId = existingFileId;
  } else if (file) {
    if (name === "") {
      throw new Error("invalid fields");
    }

    const newFile = await createAndUploadFile(
      strataId,
      session.user.id,
      name,
      description,
      file.name,
      file,
      isPublic,
    );

    fileId = newFile.id;
  }

  if (!fileId) {
    throw new Error("error while creating file");
  }

  await addFileToWidget({ widgetId, fileId });

  revalidatePath("/dashboard");
}

export async function upsertStrataWidgetAction(
  strataId: string,
  widgetId: string | undefined,
  fd: FormData,
) {
  const title = formdata.getString(fd, "title");
  // for (manual) info widget
  const body = formdata.getString(fd, "body");
  const type = formdata.getEnum(fd, "type", [
    "file",
    "files_minutes",
    "files_recent",
    "event",
    "events_upcoming",
    "info",
    "info_contact",
  ] satisfies Array<StrataWidget["type"]>);

  if (title === "" || !type) {
    throw new Error("invalid fields");
  }

  if (widgetId) {
    await updateWidget(widgetId, { title, type });
    if (type === "info") {
      // todo support creating a widget info during an update
      await updateWidgetInfo(widgetId, { body });
    }
  } else {
    const { id: widgetId } = await createWidget({
      body,
      strataId,
      title,
      type,
    });

    if (type === "info") {
      await createWidgetInfo({ body, widgetId });
    }
  }

  revalidatePath("/dashboard");
}

export async function deleteWidgetEventAction(
  widgetId: string,
  eventId: string,
) {
  await deleteEventFromWidget(widgetId, eventId);

  revalidatePath("/dashboard");
  // revalidateTag("widget_events");
}

export async function deleteWidgetFileAction(widgetId: string, fileId: string) {
  await deleteFileFromWidget(widgetId, fileId);

  revalidatePath("/dashboard");
}

export async function deleteWidgetAction(widgetId: string) {
  await deleteWidget(widgetId);

  revalidatePath("/dashboard");
}
