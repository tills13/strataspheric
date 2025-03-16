"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../auth";
import { File } from "../../../../data";
import { createAndUploadFile } from "../../../../data/files/createAndUploadFile";
import { deleteFile } from "../../../../data/files/deleteFile";
import { getFile } from "../../../../data/files/getFile";
import { updateFile } from "../../../../data/files/updateFile";
import { r2 } from "../../../../data/r2";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import * as formdata from "../../../../utils/formdata";

export async function deleteFileAction(fileId: string) {
  const f = await getFile(fileId);

  if (!f) {
    return;
  }

  await r2.delete(f.path);
  await deleteFile(fileId);

  revalidatePath("/dashboard/files");
}

/** @todo combine with other upsertFileActions */
export async function upsertFileAction(
  fileId: string | undefined,
  formData: FormData,
): Promise<File> {
  const strata = await mustGetCurrentStrata();
  const session = await auth();

  if (!session?.user || !can(session.user, p("stratas", "files", "edit"))) {
    throw new Error("not allowed");
  }

  const name = formdata.getString(formData, "name");
  const description = formdata.getString(formData, "description") || "";
  const uploadedFile = formdata.getFile(formData, "file");
  const isPublic =
    formdata.getEnum(formData, "is_public", ["public", "private"]) === "public";

  let file: File | undefined;

  if (fileId) {
    file = await updateFile(fileId, {
      name,
      description,
      isPublic: isPublic ? 1 : 0,
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

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/files");

  return file;
}
