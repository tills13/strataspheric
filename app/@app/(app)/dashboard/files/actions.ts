"use server";

import { revalidatePath } from "next/cache";
import { uuidv7 } from "uuidv7";

import { createFile } from "../../../../../db/files/createFile";
import { deleteFile } from "../../../../../db/files/deleteFile";
import { getFile } from "../../../../../db/files/getFile";
import { r2 } from "../../../../../r2";

function extname(input: string): string {
  return input.split(".").filter(Boolean).pop()!;
}

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

  const extension = extname((file as File).name);
  const newPath =
    "/" +
    strataId +
    "/" +
    Buffer.from(uuidv7()).toString("base64") +
    "." +
    extension;

  await r2.put(newPath, file as any);

  const newFile = await createFile({
    name,
    description,
    path: newPath,
    strataId,
  });

  fileId = newFile.id;

  if (!fileId) {
    throw new Error("error while creating file");
  }

  revalidatePath("/dashboard/files");
}
