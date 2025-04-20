import { sql } from "kysely";

import { db } from "..";

export type ActivityType =
  | "chat"
  | "event"
  | "file"
  | "inbox_message"
  | "invoice";

export type StrataActivity = Awaited<
  ReturnType<typeof listStrataActivity>
>[number];

type ListStrataActivityFilter = {
  activityType?: ActivityType;
  strataId?: string;
};

export async function listStrataActivity(filter: ListStrataActivityFilter) {
  let eventsQuery = db
    .selectFrom("events")
    .select([
      sql.ref<string | null>("events.creatorId").as("sourceUserId"),
      sql.ref<number>("events.startDate").as("date"),
      sql.lit<ActivityType>("event" as const).as("type"),

      sql.ref<string | null>("events.id").as("eventId"),
      sql.ref<string | null>("events.name").as("eventName"),

      sql.lit<string | null>(null).as("invoiceId"),
      sql.lit<number | null>(null).as("invoiceAmount"),
      sql.lit<string | null>(null).as("invoiceDescription"),
      sql.lit<number | null>(null).as("invoiceDueBy"),
      sql.lit<string | null>(null).as("invoiceIdentifier"),
      sql.lit<0 | 1 | null>(null).as("invoiceIsPaid"),
      sql.lit<string | null>(null).as("invoiceType"),
      sql.lit<string | null>(null).as("invoiceStatus"),

      sql.lit<string | null>(null).as("messageId"),
      sql.lit<string | null>(null).as("message"),
      sql.lit<string | null>(null).as("messageThreadId"),

      sql.lit<string | null>(null).as("fileId"),
      sql.lit<string | null>(null).as("filePath"),
      sql.lit<string | null>(null).as("fileName"),
      sql.lit<string | null>(null).as("fileDescription"),

      sql.lit<string | null>(null).as("chatId"),
      sql.lit<string | null>(null).as("chatMessage"),
      sql.lit<string | null>(null).as("chatThreadId"),
    ])
    .where("events.startDate", ">", "now" as unknown as number)
    .where("events.startDate", "<", (eb) =>
      eb
        .selectFrom("events")
        .select("startDate")
        .where("events.id", "=", "meetings.eventId"),
    );

  let invoicesQuery = db
    .selectFrom("invoices")
    .select((eb) => [
      "invoices.payee as sourceUserId",
      "invoices.createdAt as date",
      sql.lit("invoice" as const).as("type"),

      sql.lit(null).as("eventId"),
      sql.lit(null).as("eventName"),

      "invoices.id as invoiceId",
      "invoices.amount as invoiceAmount",
      "invoices.description as invoiceDescription",
      "invoices.dueBy as invoiceDueBy",
      "invoices.identifier as invoiceIdentifier",
      "invoices.isPaid as invoiceIsPaid",
      "invoices.type as invoiceType",
      "invoices.status as invoiceStatus",

      sql.lit(null).as("messageId"),
      sql.lit(null).as("message"),
      sql.lit(null).as("messageThreadId"),

      sql.lit(null).as("fileId"),
      sql.lit(null).as("filePath"),
      sql.lit(null).as("fileName"),
      sql.lit(null).as("fileDescription"),

      sql.lit(null).as("chatId"),
      sql.lit(null).as("chatMessage"),
      sql.lit(null).as("chatThreadId"),
    ]);

  let messagesQuery = db
    .selectFrom("inbox_messages")
    .select((eb) => [
      "inbox_messages.senderUserId as sourceUserId",
      "inbox_messages.sentAt as date",
      sql.lit("inbox_message" as const).as("type"),

      sql.lit(null).as("eventId"),
      sql.lit(null).as("eventName"),

      sql.lit(null).as("invoiceId"),
      sql.lit(null).as("invoiceAmount"),
      sql.lit(null).as("invoiceDescription"),
      sql.lit(null).as("invoiceDueBy"),
      sql.lit(null).as("invoiceIdentifier"),
      sql.lit(null).as("invoiceIsPaid"),
      sql.lit(null).as("invoiceType"),
      sql.lit(null).as("invoiceStatus"),

      "inbox_messages.id as messageId",
      "inbox_messages.message as message",
      "inbox_messages.threadId as messageThreadId",

      sql.lit(null).as("fileId"),
      sql.lit(null).as("filePath"),
      sql.lit(null).as("fileName"),
      sql.lit(null).as("fileDescription"),

      sql.lit(null).as("chatId"),
      sql.lit(null).as("chatMessage"),
      sql.lit(null).as("chatThreadId"),
    ]);

  let filesQuery = db
    .selectFrom("files")
    .select((eb) => [
      "files.uploaderId as sourceUserId",
      "files.createdAt as date",
      sql.lit("file" as const).as("type"),

      sql.lit(null).as("eventId"),
      sql.lit(null).as("eventName"),

      sql.lit(null).as("invoiceId"),
      sql.lit(null).as("invoiceAmount"),
      sql.lit(null).as("invoiceDescription"),
      sql.lit(null).as("invoiceDueBy"),
      sql.lit(null).as("invoiceIdentifier"),
      sql.lit(null).as("invoiceIsPaid"),
      sql.lit(null).as("invoiceType"),
      sql.lit(null).as("invoiceStatus"),

      sql.lit(null).as("messageId"),
      sql.lit(null).as("message"),
      sql.lit(null).as("messageThreadId"),

      "files.id as fileId",
      "files.path as filePath",
      "files.name as fileName",
      "files.description as fileDescription",

      sql.lit(null).as("chatId"),
      sql.lit(null).as("chatMessage"),
      sql.lit(null).as("chatThreadId"),
    ]);

  let threadChatsQuery = db
    .selectFrom("inbox_thread_chats")
    .innerJoin(
      "inbox_messages",
      "inbox_thread_chats.threadId",
      "inbox_messages.threadId",
    )
    .select((eb) => [
      "inbox_thread_chats.userId as sourceUserId",
      "inbox_thread_chats.sentAt as date",
      sql.lit("chat" as const).as("type"),

      sql.lit(null).as("eventId"),
      sql.lit(null).as("eventName"),

      sql.lit(null).as("invoiceId"),
      sql.lit(null).as("invoiceAmount"),
      sql.lit(null).as("invoiceDescription"),
      sql.lit(null).as("invoiceDueBy"),
      sql.lit(null).as("invoiceIdentifier"),
      sql.lit(null).as("invoiceIsPaid"),
      sql.lit(null).as("invoiceType"),
      sql.lit(null).as("invoiceStatus"),

      sql.lit(null).as("messageId"),
      sql.lit(null).as("message"),
      sql.lit(null).as("messageThreadId"),

      sql.lit(null).as("fileId"),
      sql.lit(null).as("filePath"),
      sql.lit(null).as("fileName"),
      sql.lit(null).as("fileDescription"),

      "inbox_thread_chats.id as chatId",
      "inbox_thread_chats.message as chatMessage",
      "inbox_thread_chats.threadId as chatThreadId",
    ]);

  if (filter.strataId) {
    eventsQuery = eventsQuery.where("events.strataId", "=", filter.strataId);
    invoicesQuery = invoicesQuery.where(
      "invoices.strataId",
      "=",
      filter.strataId,
    );
    messagesQuery = messagesQuery.where(
      "inbox_messages.strataId",
      "=",
      filter.strataId,
    );
    filesQuery = filesQuery.where("files.strataId", "=", filter.strataId);
    threadChatsQuery = threadChatsQuery.where(
      "inbox_messages.strataId",
      "=",
      filter.strataId,
    );
  }

  let query = db
    .selectFrom(
      eventsQuery
        .union(invoicesQuery)
        .union(messagesQuery)
        .union(filesQuery)
        .as("results"),
    )
    .leftJoin("users", "results.sourceUserId", "users.id")
    .selectAll()
    .select("users.name as sourceUserName");

  if (filter.activityType) {
    query = query.where("results.type", "=", filter.activityType);
  }

  query = query.orderBy("date asc");

  const rows = await query.execute();

  return rows.map(({ sourceUserId, sourceUserName, date, ...rest }) => {
    if (rest.type === "event") {
      return {
        type: "event",
        date,
        sourceUserId,
        sourceUserName,
        id: rest.eventId!,
        eventId: rest.eventId!,
        eventName: rest.eventName!,
      } as const;
    } else if (rest.type === "chat") {
      return {
        type: "chat" as const,
        date,
        sourceUserId,
        sourceUserName,
        id: rest.chatId!,
        chatId: rest.chatId!,
        chatMessage: rest.chatMessage!,
        chatThreadId: rest.chatThreadId!,
      } as const;
    } else if (rest.type === "file") {
      return {
        type: "file" as const,
        date,
        sourceUserId,
        sourceUserName,
        id: rest.fileId!,
        fileId: rest.fileId!,
        filePath: rest.filePath!,
        fileName: rest.fileName!,
        fileDescription: rest.fileDescription!,
      } as const;
    } else if (rest.type === "inbox_message") {
      return {
        type: "inbox_message" as const,
        date,
        sourceUserId,
        sourceUserName,
        id: rest.messageId!,
        messageId: rest.messageId!,
        messageMessage: rest.message!,
        messageThreadId: rest.messageThreadId!,
      } as const;
    } else if (rest.type === "invoice") {
      return {
        type: "invoice" as const,
        date,
        sourceUserId,
        sourceUserName,
        id: rest.invoiceId!,
        invoiceId: rest.invoiceId!,
        invoiceAmount: rest.invoiceAmount!,
        invoiceDescription: rest.invoiceDescription!,
        invoiceDueBy: rest.invoiceDueBy!,
        invoiceIdentifier: rest.invoiceIdentifier!,
        invoiceIsPaid: rest.invoiceIsPaid!,
        invoiceType: rest.invoiceType!,
        invoiceStatus: rest.invoiceStatus!,
      } as const;
    }

    throw new Error("unhandled activity type: " + rest.type);
  });
}
