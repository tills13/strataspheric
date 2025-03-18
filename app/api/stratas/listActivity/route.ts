import { sql } from "kysely";

import { auth } from "../../../../auth";
import { Invoice, db } from "../../../../data";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

interface BaseActivity {
  id: string;

  date: number;
  sourceUserName: string;
  type: "chat" | "event" | "file" | "inbox_message" | "invoice";
}

interface EventAcvitiy extends BaseActivity {
  type: "event";
  eventId: string;
  eventName: string;
}

interface InvoiceActivity extends BaseActivity {
  type: "invoice";
  invoiceId: Invoice["id"];
  invoiceAmount: Invoice["amount"];
  invoiceDescription: Invoice["description"];
  invoiceDueBy: Invoice["dueBy"];
  invoiceIdentifier: Invoice["identifier"];
  invoiceIsPaid: Invoice["isPaid"];
  invoiceType: Invoice["type"];
}

interface MessageActivity extends BaseActivity {
  type: "inbox_message";
  messageId: string;
  message: string;
  messageThreadId: string;
}

interface ChatActivity extends BaseActivity {
  type: "chat";
  chatId: string;
  chatMessage: string;
  chatThreadId: string;
}

interface FileActivity extends BaseActivity {
  type: "file";
  fileId: string;
  filePath: string;
  fileName: string;
  fileDescription: string;
}

export type StrataActivity =
  | EventAcvitiy
  | InvoiceActivity
  | MessageActivity
  | ChatActivity
  | FileActivity;

export const GET = auth(async (req: Request) => {
  const strata = await getCurrentStrata();

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const searchParams = new URL(req.url).searchParams;
  const activityType = searchParams.get("activityType");

  let query = db
    .selectFrom(
      db
        .selectFrom("events")
        .select([
          sql.ref<string | null>("events.creatorId").as("sourceUserId"),
          sql.ref<number>("events.startDate").as("date"),
          sql.lit<StrataActivity["type"]>("event" as const).as("type"),

          sql.ref<string | null>("events.id").as("eventId"),
          sql.ref<string | null>("events.name").as("eventName"),

          sql.lit<string | null>(null).as("invoiceId"),
          sql.lit<number | null>(null).as("invoiceAmount"),
          sql.lit<string | null>(null).as("invoiceDescription"),
          sql.lit<number | null>(null).as("invoiceDueBy"),
          sql.lit<string | null>(null).as("invoiceIdentifier"),
          sql.lit<0 | 1 | null>(null).as("invoiceIsPaid"),
          sql.lit<string | null>(null).as("invoiceType"),

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
        )
        .where("events.strataId", "=", strata.id)
        .union(
          // invoices
          db
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
            ]),
        )
        .union(
          // messages
          db
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
            ]),
        )

        .union(
          // files
          db
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
            ])
            .where("files.strataId", "=", strata.id),
        )

        .union(
          // thread chats
          db
            .selectFrom("inbox_thread_chats")
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
            ]),
        )

        .as("results"),
    )
    .leftJoin("users", "results.sourceUserId", "users.id")
    .selectAll()
    .select("users.name as sourceUserName");

  if (activityType) {
    query = query.where(
      "results.type",
      "=",
      activityType as StrataActivity["type"],
    );
  }

  query = query.orderBy("date asc");

  const activity = await query.execute();

  return new Response(JSON.stringify({ activity }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
