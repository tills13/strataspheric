import { db } from "..";

export async function deleteStrata(strataId: string) {
  return db
    .deleteFrom("stratas")
    .where("stratas.id", "=", strataId)
    .executeTakeFirstOrThrow();
}
