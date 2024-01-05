"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import { createAndUploadFile } from "../../../../../data/files/createAndUploadFile";
import { deleteFile } from "../../../../../data/files/deleteFile";
import { getFile } from "../../../../../data/files/getFile";
import { updateFile } from "../../../../../data/files/updateFile";
import { r2 } from "../../../../../data/r2";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
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
