import { InboxThreadChat, StrataMembership, db } from "..";

interface BaseThreadChat extends StrataMembership, InboxThreadChat {}

interface TheadChatWithQuote extends StrataMembership, InboxThreadChat {
  quotedMessageId: string;
  quotedMessageMessage: string;
  quotedMessageTimestamp: string;
  quotedMessageSender: string;
}

interface TheadChatWithFile extends StrataMembership, InboxThreadChat {
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
      "inbox_messages.id as quotedMessageId",
      "inbox_messages.message as quotedMessageMessage",
      eb.fn
        .coalesce("sa2.name", "inbox_messages.senderName")
        .as("quotedMessageSender"),
      "inbox_messages.sentAt as quotedMessageTimestamp",
    ])
    .where("inbox_thread_chats.threadId", "=", threadId)
    .execute();
}
