import { InboxThreadChat, User, db } from "..";

interface BaseThreadChat extends User, InboxThreadChat {}

interface TheadChatWithQuote extends User, InboxThreadChat {
  quotedMessageId: string;
  quotedMessageMessage: string;
  quotedMessageTimestamp: string;
  quotedMessageSender: string;
}

interface TheadChatWithFile extends User, InboxThreadChat {
  filePath: string;
  fileName: string;
}

export type Chat = BaseThreadChat | TheadChatWithQuote | TheadChatWithFile;

export function isThreadChatWithQuote(
  input: Chat,
): input is TheadChatWithQuote {
  return !!input.messageId;
}

export function isThreadChatWithFile(input: Chat): input is TheadChatWithFile {
  return !!input.fileId;
}

export function getThreadChats(threadId: string): Promise<Chat[]> {
  return db
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
    .selectAll(["inbox_thread_chats", "users"])
    .select((eb) => [
      "files.name as fileName",
      "files.description as fileDescription",
      "files.path as filePath",
      "inbox_messages.id as quotedMessageId",
      eb.fn
        .coalesce("quotedMessageUsers.name", "inbox_messages.senderName")
        .as("quotedMessageSender"),
      "inbox_messages.message as quotedMessageMessage",
      "inbox_messages.sentAt as quotedMessageTimestamp",
    ])
    .where("inbox_thread_chats.threadId", "=", threadId)
    .execute();
}
