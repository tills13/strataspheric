import { db } from "..";

export function deleteAllThreads(strataId: string) {
  return db
    .deleteFrom("inbox_messages")
    .where("inbox_messages.strataId", "=", strataId)
    .execute();
}
