import { sql } from "kysely";

import { db } from "..";

export type MeetingAgendaItem = Awaited<
  ReturnType<typeof getMeetingAgendaItems>
>[number];

export function getMeetingAgendaItems(meetingId: string) {
  return db
    .selectFrom("meeting_agenda_items")
    .leftJoin("events", "meeting_agenda_items.eventId", "events.id")
    .leftJoin("files", "meeting_agenda_items.fileId", "files.id")
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("inbox_messages")
          .leftJoin("users", "inbox_messages.senderUserId", "users.id")
          .select((eb) => [
            "inbox_messages.id",
            "inbox_messages.threadId",
            "inbox_messages.senderUserId",
            "inbox_messages.subject",
            "inbox_messages.message",
            "inbox_messages.sentAt",
            sql<string>`
              CASE 
                WHEN inbox_messages.senderName = '' THEN users.name
                ELSE coalesce(inbox_messages.senderName, users.name)
              END
            `.as("senderName"),
          ])
          .as("inbox_messages"),
      (join) =>
        join.onRef("inbox_messages.id", "=", "meeting_agenda_items.messageId"),
    )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("inbox_thread_chats")
          .innerJoin("users", "inbox_thread_chats.userId", "users.id")
          .selectAll(["inbox_thread_chats"])
          .select(["users.name as senderName"])
          .as("inbox_thread_chats"),
      (join) =>
        join.onRef("inbox_thread_chats.id", "=", "meeting_agenda_items.chatId"),
    )
    .selectAll(["meeting_agenda_items"])
    .select([
      "events.name as eventName",
      "events.description as eventDescription",

      "files.name as fileName",
      "files.path as filePath",
      "files.description as fileDescription",
      "files.createdAt as fileCreatedAt",

      "inbox_messages.id as messageId",
      "inbox_messages.threadId as messageThreadId",
      "inbox_messages.subject as messageSubject",
      "inbox_messages.message as messageMessage",
      "inbox_messages.senderName as messageSenderName",
      "inbox_messages.sentAt as messageSentAt",

      "inbox_thread_chats.senderName as chatSenderName",
      "inbox_thread_chats.message as chatMessage",
      "inbox_thread_chats.sentAt as chatSentAt",
    ])
    .where("meeting_agenda_items.meetingId", "=", meetingId)
    .execute();
}
