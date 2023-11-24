import { db } from "..";

export function deleteThreadChats(threadId: string) {
  return db
    .deleteFrom("inbox_thread_chats")
    .where("inbox_thread_chats.threadId", "=", threadId)
    .execute();
}
