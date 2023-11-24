import { db } from "..";

export function deleteThread(threadId: string) {
  return db
    .deleteFrom("inbox_messages")
    .where("inbox_messages.threadId", "=", threadId)
    .execute();
}
