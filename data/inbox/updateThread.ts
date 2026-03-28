import { InboxMessageUpdate, db } from "..";

export function updateThread(threadId: string, data: InboxMessageUpdate) {
  return db()
    .updateTable("inbox_messages")
    .set(data)
    .where("inbox_messages.id", "=", threadId)
    .where("inbox_messages.threadId", "=", threadId)
    .execute();
}
