"use server";

import { revalidatePath } from "next/cache";

import { createFile } from "../../../../../db/files/createFile";

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

  const newFile = await createFile({
    name,
    description,
    path: (file as File).name,
    strataId,
  });

  fileId = newFile.id;

  if (!fileId) {
    throw new Error("error while creating file");
  }

  revalidatePath("/dashboard/files");
}
