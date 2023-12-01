"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import { createAndUpdloadFile } from "../../../../../data/files/createAndUploadFile";
import { deleteFile } from "../../../../../data/files/deleteFile";
import { getFile } from "../../../../../data/files/getFile";
import { r2 } from "../../../../../data/r2";
import * as formdata from "../../../../../utils/formdata";

export async function deleteFileAction(fileId: string) {
  const f = await getFile(fileId);

  if (!f) {
    return;
  }

  await r2.delete(f.path);
  await deleteFile(fileId);

  revalidatePath("/dashboard/files");
}

export async function createFileAction(strataId: string, formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description") || "";
  const file = formdata.getFile(formData, "file");
  const isPublic = formdata.getBoolean(formData, "isPublic");

  let fileId: string | undefined;

  if (name === "" || !file) {
    throw new Error("invalid fields");
  }

  const newFile = await createAndUpdloadFile(
    strataId,
    session.user.id,
    name,
    description,
    file.name,
    file,
    isPublic,
  );

  fileId = newFile.id;

  if (!fileId) {
    throw new Error("error while creating file");
  }

  revalidatePath("/dashboard/files");
}
