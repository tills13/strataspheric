import { InboxMessage, db } from "..";

export type Thread = InboxMessage & {
  numChats: number | null;
};

export function getThreads(
  strataId: string,
  senderUserId?: string,
): Promise<Thread[]> {
  let query = db
    .selectFrom("inbox_messages")
    .leftJoin("users", "inbox_messages.senderUserId", "users.id")
    .select((eb) => [
      "inbox_messages.id",
      "inbox_messages.subject",
      "inbox_messages.message",
      "inbox_messages.threadId",
      "inbox_messages.viewId",
      "inbox_messages.isUnread",
      "inbox_messages.sentAt",
      "inbox_messages.senderUserId",
      "inbox_messages.senderPhoneNumber",
      "inbox_messages.strataId",
      "inbox_messages.fileId",
      eb.fn
        .coalesce("users.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("users.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
      eb
        .selectFrom("inbox_thread_chats")
        .select((mEb) => mEb.fn.countAll<number>().as("count"))
        .where(
          "inbox_thread_chats.threadId",
          "=",
          eb.ref("inbox_messages.threadId"),
        )
        .as("numChats"),
    ])
    .where("inbox_messages.id", "in", (eb) =>
      eb
        .selectFrom("inbox_messages")
        .select((eb) => eb.fn.min("inbox_messages.id").as("id"))
        .groupBy("inbox_messages.threadId"),
    )
    .where("inbox_messages.strataId", "=", strataId);

  if (senderUserId) {
    query = query.where("inbox_messages.senderUserId", "=", senderUserId);
  }

  return query.orderBy("inbox_messages.sentAt desc").execute();
}
