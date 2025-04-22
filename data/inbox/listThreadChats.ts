import { db } from "..";

type ListThreadChatsFilter = {
  threadId?: string;
};

export async function listThreadChats(filter: ListThreadChatsFilter) {
  let query = db
    .selectFrom("inbox_thread_chats")
    .innerJoin("users", "inbox_thread_chats.userId", "users.id")
    .leftJoin("files", "files.id", "inbox_thread_chats.fileId")
    .leftJoin(
      "inbox_messages",
      "inbox_messages.id",
      "inbox_thread_chats.messageId",
    )
    .leftJoin(
      "users as quotedMessageUsers",
      "inbox_messages.senderUserId",
      "quotedMessageUsers.id",
    )
    .select((eb) => [
      "inbox_thread_chats.id",
      "inbox_thread_chats.message",
      "inbox_thread_chats.threadId",
      "inbox_thread_chats.userId",
      "inbox_thread_chats.chatId",
      "inbox_thread_chats.fileId",
      "inbox_thread_chats.messageId",
      "inbox_thread_chats.threadId",
      "inbox_thread_chats.sentAt",

      "users.name",
      "users.email",

      "files.name as fileName",
      "files.description as fileDescription",
      "files.path as filePath",
      "inbox_messages.id as quotedMessageId",
      eb.fn
        .coalesce("quotedMessageUsers.name", "inbox_messages.senderName")
        .as("quotedMessageSender"),
      "inbox_messages.message as quotedMessageMessage",
      "inbox_messages.sentAt as quotedMessageTimestamp",
    ]);

  if (filter.threadId) {
    query = query.where("inbox_thread_chats.threadId", "=", filter.threadId);
  }

  return query.execute();
}
