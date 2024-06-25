"use server";

import { revalidatePath } from "next/cache";

import { deleteFile } from "../../../../data/files/deleteFile";
import { getFile } from "../../../../data/files/getFile";
import { r2 } from "../../../../data/r2";

export async function deleteFileAction(fileId: string) {
  const f = await getFile(fileId);

  if (!f) {
    return;
  }

  await r2.delete(f.path);
  await deleteFile(fileId);

  revalidatePath("/dashboard/files");
}
