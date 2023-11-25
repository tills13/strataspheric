"use server";

import { revalidatePath } from "next/cache";

import { createAndUpdloadFile } from "../../../../../data/files/createAndUploadFile";
import { deleteFile } from "../../../../../data/files/deleteFile";
import { getFile } from "../../../../../data/files/getFile";
import { r2 } from "../../../../../data/r2";

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
  const name = formData.get("name");
  const description = formData.get("description") || "";
  const file = formData.get("file");

  let fileId: string | undefined;

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

  if (!fileId) {
    throw new Error("error while creating file");
  }

  revalidatePath("/dashboard/files");
}
