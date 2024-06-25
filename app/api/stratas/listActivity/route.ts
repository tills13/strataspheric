import { sql } from "kysely";

import { auth } from "../../../../auth";
import { db } from "../../../../data";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

interface BaseActivity {
  id: string;

  date: number;
  type: "chat" | "event" | "file" | "inbox_message" | "invoice";
}

interface EventAcvitiy extends BaseActivity {
  type: "event";
  eventId: string;
  eventName: string;
}

interface InvoiceActivity extends BaseActivity {
  type: "invoice";
  invoiceId: string;
  invoiceIdentifier: string;
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
        .select((eb) => [
          "events.creatorId as sourceUserId",
          "events.startDate as date",
          sql.lit("event").as("type"),

          "events.id as eventId",
          "events.name as eventName",

          sql.lit(null).as("invoiceId"),
          sql.lit(null).as("invoiceIdentifier"),

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
        ])
        .where("events.startDate", ">", "now")
        .where("events.startDate", "<", (eb) =>
          eb
            .selectFrom("events")
            .select("startDate")
            .where("events.id", "=", "meetings.eventId"),
        )
        .where("events.strataId", "=", strata.id)
        .union(
          // files (all)
          db
            .selectFrom("files")
            .select((eb) => [
              "files.uploaderId as sourceUserId",

              "files.createdAt as date",
              sql.lit<StrataActivity["type"]>("file").as("type"),

              sql.lit<string | null>(null).as("eventId"),
              sql.lit<string | null>(null).as("eventName"),

              sql.lit<string | null>(null).as("invoiceId"),
              sql.lit<string | null>(null).as("invoiceIdentifier"),

              sql.lit<string | null>(null).as("messageId"),
              sql.lit<string | null>(null).as("message"),
              sql.lit<string | null>(null).as("messageThreadId"),

              "files.id as fileId",
              "files.path as filePath",
              "files.name as fileName",
              "files.description as fileDescription",

              sql.lit<string | null>(null).as("chatId"),
              sql.lit<string | null>(null).as("chatMessage"),
              sql.lit<string | null>(null).as("chatThreadId"),
            ])
            .where("files.strataId", "=", strata.id)
            .$narrowType<FileActivity>(),
        )
        .union(
          // inbox messages (all)
          db
            .selectFrom("inbox_messages")
            .select((eb) => [
              eb
                .selectFrom("users")
                .select("users.name")
                .where("users.id", "=", eb.ref("inbox_messages.senderUserId"))
                .as("sourceUserName"),
              "inbox_messages.sentAt as date",
              sql.lit<StrataActivity["type"]>("inbox_message").as("type"),

              sql.lit<string | null>(null).as("eventId"),
              sql.lit<string | null>(null).as("eventName"),

              sql.lit<string | null>(null).as("invoiceId"),
              sql.lit<string | null>(null).as("invoiceIdentifier"),

              "inbox_messages.id as messageId",
              "inbox_messages.message as message",
              "inbox_messages.threadId as messageThreadId",

              sql.lit<string | null>(null).as("fileId"),
              sql.lit<string | null>(null).as("filePath"),
              sql.lit<string | null>(null).as("fileName"),
              sql.lit<string | null>(null).as("fileDescription"),

              sql.lit<string | null>(null).as("chatId"),
              sql.lit<string | null>(null).as("chatMessage"),
              sql.lit<string | null>(null).as("chatThreadId"),
            ]),
        )
        .union(
          // thread chats (all)
          db
            .selectFrom("inbox_thread_chats")
            .select((eb) => [
              eb
                .selectFrom("users")
                .select("users.name")
                .where("users.id", "=", eb.ref("inbox_thread_chats.userId"))
                .as("sourceUserName"),
              "inbox_thread_chats.sentAt as date",
              sql.lit<StrataActivity["type"]>("chat").as("type"),

              sql.lit<string | null>(null).as("eventId"),
              sql.lit<string | null>(null).as("eventName"),

              sql.lit<string | null>(null).as("invoiceId"),
              sql.lit<string | null>(null).as("invoiceIdentifier"),

              sql.lit<string | null>(null).as("messageId"),
              sql.lit<string | null>(null).as("message"),
              sql.lit<string | null>(null).as("messageThreadId"),

              sql.lit<string | null>(null).as("fileId"),
              sql.lit<string | null>(null).as("filePath"),
              sql.lit<string | null>(null).as("fileName"),
              sql.lit<string | null>(null).as("fileDescription"),

              "inbox_thread_chats.id as chatId",
              "inbox_thread_chats.message as as chatMessage",
              "inbox_thread_chats.threadId as chatThreadId",
            ]),
        )
        .as("results"),
    )
    .leftJoin("users", "results.sourceUserId", "users.id")
    .selectAll()
    .select("users.name as sourceUserName");

  if (activityType) {
    query = query.where("results.type", "=", activityType);
  }

  query = query.orderBy("date asc");

  const activity = await query.execute();

  return new Response(JSON.stringify({ activity }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
