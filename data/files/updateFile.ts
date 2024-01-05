import { File, FileUpdate, db } from "..";

export async function updateFile(
  fileId: string,
  fileUpdate: FileUpdate,
): Promise<File> {
  return db
    .updateTable("files")
    .set(fileUpdate)
    .where("files.id", "=", fileId)
    .returningAll()
    .executeTakeFirstOrThrow();
}
