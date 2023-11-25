import { db } from "..";

export function getFiles(strataId: string) {
  return db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId)
    .execute();
}
