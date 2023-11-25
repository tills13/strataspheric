import { db } from "..";

export async function getFile(fileId: string) {
  return db
    .selectFrom("files")
    .selectAll()
    .where("files.id", "=", fileId)
    .executeTakeFirst();
}
