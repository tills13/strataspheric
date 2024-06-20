import { s } from "../../../../../../sprinkles.css";
import * as styles from "./style.css";

import { sql } from "kysely";

import { Header } from "../../../../../../components/Header";
import { MeetingTimelineIcon } from "../../../../../../components/MeetingTimelineIcon";
import { MeetingTimelineItem } from "../../../../../../components/MeetingTimelineItem";
import { Timeline } from "../../../../../../components/Timeline";
import { db } from "../../../../../../data";
import { classnames } from "../../../../../../utils/classnames";
import { addItemToAgendaAction } from "./actions";

export type AgendaTimelineEntry = {
  date: number;
  sourceUserName: string | null;
  type: "invoice" | "event" | "file" | "inbox_message" | "chat";

  eventId: string;
  eventName: string;

  invoiceId: string;
  invoiceIdentifier: string;

  // inbox messages
  messageId: string;
  message: string;
  messageThreadId: string;

  // chats
  chatId: string;
  chatMessage: string;
  chatThreadId: string;

  // files
  fileId: string;
  filePath: string;
  fileName: string;
  fileDescription: string;
};

export interface Props {
  meetingId: string;
  strataId: string;
}

export async function MeetingTimelineSearch({ meetingId, strataId }: Props) {
  const timeline: AgendaTimelineEntry[] = await db
    .selectFrom(
      // events in the future
      db
        .selectFrom("events")
        .select((eb) => [
          eb
            .selectFrom("users")
            .select("users.name")
            .where("users.id", "=", eb.ref("events.creatorId"))
            .as("sourceUserName"),
          "events.startDate as date",
          sql.lit<AgendaTimelineEntry["type"]>("event").as("type"),

          "events.id as eventId",
          "events.name as eventName",

          sql.lit<string | null>(null).as("invoiceId"),
          sql.lit<string | null>(null).as("invoiceIdentifier"),

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
        .where("events.startDate", ">", "now")
        .where("events.startDate", "<", (eb) =>
          eb
            .selectFrom("events")
            .select("startDate")
            .where("events.id", "=", "meetings.eventId"),
        )
        .where("events.strataId", "=", strataId)
        .union(
          // files (all)
          db
            .selectFrom("files")
            .select((eb) => [
              eb
                .selectFrom("users")
                .select("users.name")
                .where("users.id", "=", eb.ref("files.uploaderId"))
                .as("sourceUserName"),
              "files.createdAt as date",
              sql.lit<AgendaTimelineEntry["type"]>("file").as("type"),

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
            .where("files.strataId", "=", strataId),
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
              sql.lit<AgendaTimelineEntry["type"]>("inbox_message").as("type"),

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
              sql.lit<AgendaTimelineEntry["type"]>("chat").as("type"),

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
    .selectAll()
    .orderBy("date asc")
    .execute();

  return (
    <>
      <Header
        className={classnames(styles.header, s({ mb: "normal" }))}
        priority={2}
      >
        Timeline
      </Header>
      <Timeline
        items={timeline.map((item) => ({
          icon: <MeetingTimelineIcon type={item.type} />,
          contents: (
            <MeetingTimelineItem
              key={item.id}
              addItemToAgenda={addItemToAgendaAction.bind(
                undefined,
                meetingId,
                item,
              )}
              {...item}
            />
          ),
        }))}
      />
    </>
  );
}
