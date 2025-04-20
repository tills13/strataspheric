import { sql } from "kysely";

import { db } from "..";

export type MeetingAgendaItem = Awaited<
  ReturnType<typeof listMeetingAgendaItems>
>[number];

export async function listMeetingAgendaItems(meetingId: string) {
  const rows = await db
    .selectFrom("meeting_agenda_items")
    .leftJoin("events", "meeting_agenda_items.eventId", "events.id")
    .leftJoin("files", "meeting_agenda_items.fileId", "files.id")
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("inbox_messages")
          .leftJoin("users", "inbox_messages.senderUserId", "users.id")
          .select((_) => [
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
    .leftJoin("invoices", "meeting_agenda_items.invoiceId", "invoices.id")
    .select([
      "meeting_agenda_items.id",
      "meeting_agenda_items.title",
      "meeting_agenda_items.description",
      "meeting_agenda_items.done",

      "events.id as eventId",
      "events.name as eventName",
      "events.description as eventDescription",

      "files.id as fileId",
      "files.name as fileName",
      "files.path as filePath",
      "files.description as fileDescription",
      "files.createdAt as fileCreatedAt",

      "invoices.id as invoiceId",
      "invoices.status as invoiceStatus",
      "invoices.identifier as invoiceIdentifier",
      "invoices.description as invoiceDescription",
      "invoices.amount as invoiceAmount",
      "invoices.isPaid as invoiceIsPaid",

      "inbox_messages.id as messageId",
      "inbox_messages.threadId as messageThreadId",
      "inbox_messages.subject as messageSubject",
      "inbox_messages.message as messageMessage",
      "inbox_messages.senderName as messageSenderName",
      "inbox_messages.sentAt as messageSentAt",

      "inbox_thread_chats.id as chatId",
      "inbox_thread_chats.senderName as chatSenderName",
      "inbox_thread_chats.threadId as chatThreadId",
      "inbox_thread_chats.message as chatMessage",
      "inbox_thread_chats.sentAt as chatSentAt",
    ])
    .where("meeting_agenda_items.meetingId", "=", meetingId)
    .execute();

  return rows.map(
    ({
      chatId,
      chatMessage,
      chatSenderName,
      chatSentAt,
      chatThreadId,

      eventId,
      eventDescription,
      eventName,

      fileId,
      fileName,
      filePath,
      fileDescription,
      fileCreatedAt,

      invoiceId,
      invoiceAmount,
      invoiceDescription,
      invoiceIdentifier,
      invoiceIsPaid,
      invoiceStatus,

      messageId,
      messageMessage,
      messageSenderName,
      messageSentAt,
      messageSubject,
      messageThreadId,

      ...rest
    }) => ({
      ...rest,
      chat: chatId
        ? {
            id: chatId!,
            message: chatMessage!,
            senderName: chatSenderName!,
            sentAt: chatSentAt!,
            threadId: chatThreadId!,
          }
        : undefined,
      event: eventId
        ? {
            id: eventId,
            description: eventDescription,
            name: eventName,
          }
        : undefined,
      file: fileId
        ? {
            id: fileId,
            name: fileName!,
            path: filePath!,
            description: fileDescription!,
            createdAt: fileCreatedAt!,
          }
        : undefined,
      message: messageId
        ? {
            id: messageId!,
            message: messageMessage!,
            senderName: messageSenderName!,
            sentAt: messageSentAt!,
            subject: messageSubject!,
            threadId: messageThreadId!,
          }
        : undefined,
      invoice: invoiceId
        ? {
            id: invoiceId!,
            amount: invoiceAmount!,
            description: invoiceDescription!,
            identifier: invoiceIdentifier!,
            isPaid: invoiceIsPaid!,
            status: invoiceStatus!,
          }
        : undefined,
    }),
  );
}
