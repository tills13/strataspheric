"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../auth";
import { File } from "../../../data";
import { createEvent } from "../../../data/events/createEvent";
import { createAndUploadFile } from "../../../data/files/createAndUploadFile";
import { updateFile } from "../../../data/files/updateFile";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { addEventToWidget } from "../../../data/widgets/addEventToWidget";
import { addFileToWidget } from "../../../data/widgets/addFileToWidget";
import { createWidget } from "../../../data/widgets/createWidget";
import { deleteEventFromWidget } from "../../../data/widgets/deleteEventFromWidget";
import { deleteFileFromWidget } from "../../../data/widgets/deleteFileFromWidget";
import { deleteWidget } from "../../../data/widgets/deleteWidget";
import { updateWidget } from "../../../data/widgets/updateWidget";
import * as formdata from "../../../utils/formdata";

export async function createEventAction(
  strataId: string,
  widgetId: string,
  formData: FormData,
) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

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
    creatorId: session.user.id!,
  });

  if (!eventId) {
    throw new Error("error while creating event");
  }

  await addEventToWidget({ widgetId, eventId });

  revalidatePath("/dashboard");
}

export async function upsertFileAction(
  fileId: string | undefined,
  formData: FormData,
): Promise<File> {
  const strata = await mustGetCurrentStrata();
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description") || "";
  const uploadedFile = formdata.getFile(formData, "file");
  const isPublic = formdata.getBoolean(formData, "isPublic");

  let file: File | undefined;

  if (fileId) {
    file = await updateFile(fileId, {
      name,
      description,
      isPublic: isPublic ? 0 : 1,
    });
  } else {
    if (name === "" || !uploadedFile) {
      throw new Error("invalid fields");
    }

    file = await createAndUploadFile(
      strata.id,
      session.user.id,
      name,
      description,
      uploadedFile.name,
      uploadedFile,
      isPublic,
    );
  }

  revalidatePath("/dashboard/files");

  return file;
}

export async function createFileAction(
  strataId: string,
  widgetId: string,
  formData: FormData,
) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description") || "";
  const file = formdata.getFile(formData, "file");
  const existingFileId = formdata.getString(formData, "existing_file");
  const isPublic = formdata.getBoolean(formData, "isPublic");

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

export async function upsertStrataWidget(
  strataId: string,
  widgetId: string | undefined,
  fd: FormData,
) {
  const title = formdata.getString(fd, "title");
  const type = formdata.getString(fd, "type");

  if (title === "" || !(type === "file" || type === "event")) {
    throw new Error("invalid fields");
  }

  if (widgetId) {
    await updateWidget(widgetId, { title, type });
  } else {
    await createWidget({ strataId, title, type });
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
