"use client";

import * as styles from "../../app/@app/dashboard/meetings/[meetingId]/style.css";
import { s } from "../../sprinkles.css";

import { useState } from "react";
import useSWR from "swr";

import { NewMeetingAgendaItem } from "../../data";
import { StrataActivity } from "../../data/meetings/listStrataActivity";
import { Select } from "../Select";
import { Timeline } from "../Timeline";
import { StrataActivityTimelineIcon } from "./StrataActivityTimelineIcon";
import { StrataActivityTimelineItem } from "./StrataActivityTimelineItem";

async function fetchStrataEvents(activityType: string | undefined) {
  // const startDate = new Date(year, month - 1, 1);
  // const endDate = endOfMonth(startDate);

  const searchParams = new URLSearchParams();

  if (activityType) {
    searchParams.set("activityType", activityType);
  }

  const response = await fetch(
    `/api/stratas/listActivity?${searchParams.toString()}`,
  );

  return (await response.json()).activity as StrataActivity[];
}

function strataActivityToAgendaItem(
  activity: StrataActivity,
): Omit<NewMeetingAgendaItem, "id" | "meetingId"> {
  let sourceUserName = activity.sourceUserName || "Someone";

  switch (activity.type) {
    case "event": {
      return {
        description: activity.eventName + " is scheduled for " + activity.date,
        eventId: activity.eventId,
        title: sourceUserName + " scheduled an event",
      };
    }
    case "file": {
      return {
        description: "",
        fileId: activity.fileId,
        title: sourceUserName + " added a file",
      };
    }
    case "invoice": {
      return {
        description: "",
        // @ts-ignore
        invoiceId: activity.invoiceId,
        title: sourceUserName + " added an invoice",
      };
    }
    case "inbox_message": {
      return {
        description: "",
        messageId: activity.messageId,
        title: sourceUserName + " sent a message",
      };
    }

    case "chat": {
      return {
        description: "",
        messageId: activity.chatThreadId,
        title: sourceUserName + " chatted about a received message",
      };
    }
  }
}

export interface Props {
  meetingId: string;
}

export function StrataActivityTimelime({ meetingId }: Props) {
  const [activityType, setActivityType] = useState<string>();
  const { data: timeline = [] } = useSWR(
    ["activity", `type=${activityType}`],
    () => fetchStrataEvents(activityType),
  );

  return (
    <>
      <Select
        className={s({ mb: "large" })}
        label="Activity Type"
        onChange={(e) => setActivityType(e.target.value)}
      >
        <option value="">All Activity</option>
        <option value="event">Events</option>
        <option value="chat">Chats</option>
        <option value="inbox_message">Messages</option>
        <option value="file">Files</option>
        <option value="invoice">Invoices</option>
      </Select>

      <div className={styles.strataActivityModalTimelineContainer}>
        <Timeline
          emptyMessage={`No recent ${activityType} activity`}
          items={timeline.map((activity) => ({
            icon: <StrataActivityTimelineIcon type={activity.type} />,
            contents: (
              <StrataActivityTimelineItem
                key={activity.id}
                activity={activity}
                meetingId={meetingId}
              />
            ),
          }))}
        />
      </div>
    </>
  );
}
