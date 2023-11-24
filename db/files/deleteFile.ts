import { db } from "..";

export async function deleteFile(fileId: string) {
  return db.deleteFrom("files").where("files.id", "=", fileId).execute();
}
