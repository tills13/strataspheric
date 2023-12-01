import * as styles from "./style.css";

import { sql } from "kysely";

import { Header } from "../../../../../../components/Header";
import { MeetingTimelineItem } from "../../../../../../components/MeetingTimelineItem";
import { db } from "../../../../../../data";
import { getMeeting } from "../../../../../../data/meetings/getMeeting";
import { addItemToAgendaAction } from "./actions";

export type AgendaTimelineEntry = {
  id: string;
  title: string;
  date: string;
  description: string;
  sourceUserName: string | null;
  type: "event" | "file" | "inbox_message" | "chat";
};

export interface Props {
  meetingId: string;
  strataId: string;
}

export async function MeetingTimelineSearch({ meetingId, strataId }: Props) {
  // const meeting = await getMeeting(meetingId);

  const timeline: AgendaTimelineEntry[] = await db
    .selectFrom(
      // events in the future
      db
        .selectFrom("events")
        .select((eb) => [
          "events.id",
          "events.name as title",
          "events.description",
          "events.date as date",
          eb
            .selectFrom("users")
            .select("users.name")
            .where("users.id", "=", eb.ref("events.creatorId"))
            .as("sourceUserName"),
          sql.lit<AgendaTimelineEntry["type"]>("event").as("type"),
        ])
        .where("events.date", ">", "CURRENT_TIMESTAMP")
        .where("events.date", "<", (eb) =>
          eb
            .selectFrom("meetings")
            .select("date")
            .where("meetings.id", "=", "meetingId"),
        )
        .where("events.strataId", "=", strataId)
        .union(
          // files (all)
          db
            .selectFrom("files")
            .select((eb) => [
              "files.id",
              "files.name as title",
              // @todo maybe this is stupid -- kind of want both description and path, too
              "files.path as description",
              "files.createdAt as date",
              // @todo coalesce
              eb
                .selectFrom("users")
                .select("users.name")
                .where("users.id", "=", eb.ref("files.uploaderId"))
                .as("sourceUserName"),
              sql.lit<AgendaTimelineEntry["type"]>("file").as("type"),
            ])
            .where("files.strataId", "=", strataId),
        )
        .union(
          // inbox messages (all)
          db.selectFrom("inbox_messages").select((eb) => [
            "inbox_messages.id",
            "inbox_messages.subject as title",
            "inbox_messages.message as description",
            "inbox_messages.sentAt as date",
            // @todo coalesce
            eb
              .selectFrom("users")
              .select("users.name")
              .where("users.id", "=", eb.ref("inbox_messages.senderUserId"))
              .as("sourceUserName"),
            sql.lit<AgendaTimelineEntry["type"]>("inbox_message").as("type"),
          ]),
        )
        .union(
          // thread chats (all)
          db
            .selectFrom("inbox_thread_chats")
            .select((eb) => [
              "inbox_thread_chats.id",
              sql.lit("").as("title"),
              "inbox_thread_chats.message as description",
              "inbox_thread_chats.sentAt as date",
              eb
                .selectFrom("users")
                .select("users.name")
                .where("users.id", "=", eb.ref("inbox_thread_chats.userId"))
                .as("sourceUserName"),
              sql.lit<AgendaTimelineEntry["type"]>("chat").as("type"),
            ]),
        )
        .as("results"),
    )
    .selectAll()
    .orderBy("date asc")
    .execute();

  return (
    <>
      <Header className={styles.header} priority={2}>
        Timeline
      </Header>
      <div className={styles.timeline}>
        {timeline.map((timelineItem) => (
          <MeetingTimelineItem
            key={timelineItem.id}
            addItemToAgenda={addItemToAgendaAction.bind(
              undefined,
              meetingId,
              timelineItem,
            )}
            {...timelineItem}
          />
        ))}
      </div>
    </>
  );
}