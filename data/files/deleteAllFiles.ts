import { db } from "..";

export async function deleteAllFiles(strataId: string) {
  return db
    .deleteFrom("files")
    .where("files.strataId", "=", strataId)
    .execute();
}
