import { db } from "..";

export function deleteAllThreadChats(strataId: string) {
  return db
    .deleteFrom("inbox_thread_chats")
    .where("inbox_thread_chats.threadId", "in", (eb) =>
      eb
        .selectFrom("inbox_messages")
        .select("id")
        .where("inbox_messages.strataId", "=", strataId),
    )
    .execute();
}
