import { db } from "..";

export function getInboxThreadChats(threadId: string) {
  return db
    .selectFrom("inbox_thread_chats")
    .innerJoin(
      "strata_memberships",
      "strata_memberships.userId",
      "inbox_thread_chats.userId",
    )
    .leftJoin("files", "files.id", "inbox_thread_chats.fileId")
    .leftJoin(
      "inbox_messages",
      "inbox_messages.id",
      "inbox_thread_chats.messageId",
    )
    .leftJoin(
      "strata_memberships as sa2",
      "sa2.userId",
      "inbox_messages.senderUserId",
    )
    .selectAll(["inbox_thread_chats", "strata_memberships"])
    .select([
      "files.name as fileName",
      "files.description as fileDescription",
      "files.path as filePath",
    ])
    .select((eb) => [
      "inbox_messages.message as quotedMessageMessage",
      eb.fn
        .coalesce("sa2.name", "inbox_messages.senderName")
        .as("quotedMessageSender"),
      "inbox_messages.sentAt as quotedMessageTimestamp",
    ])
    .where("inbox_thread_chats.threadId", "=", threadId)
    .execute();
}
