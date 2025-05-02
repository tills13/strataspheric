"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useTransition } from "react";

import { addItemToAgendaAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { StrataActivity } from "../../data/meetings/listStrataActivity";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { Group } from "../Group";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";
import { StrataActivityTimelineItemBody } from "./StrataActivityTimelineItemBody";

function strataActivityToAgentItem(
  activity: StrataActivity,
): Parameters<typeof addItemToAgendaAction>["1"] {
  switch (activity.type) {
    case "event": {
      return {
        description: activity.eventName + " is scheduled for " + activity.date,
        eventId: activity.eventId,
        title: activity.sourceUserName + " scheduled an event",
      };
    }
    case "file": {
      return {
        description: "",
        fileId: activity.fileId,
        title: activity.sourceUserName + " added a file",
      };
    }
    case "invoice": {
      return {
        description: "",
        invoiceId: activity.invoiceId,
        title: activity.sourceUserName + " added an invoice",
      };
    }
    case "inbox_message": {
      return {
        description: "",
        messageId: activity.messageId,
        title: activity.sourceUserName + " sent a message",
      };
    }

    case "chat": {
      return {
        description: "",
        messageId: activity.chatThreadId,
        title: activity.sourceUserName + " chatted about a received message",
      };
    }
  }

  throw new Error(
    "unhandled activity type: " + (activity as { type: string }).type,
  );
}

interface Props {
  activity: StrataActivity;
  className?: string;
  meetingId: string;
}

export function StrataActivityTimelineItem({
  className,
  activity,
  meetingId,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const sourceUserName = activity.sourceUserName || "Someone";

  let title = sourceUserName;

  if (activity.type === "event") {
    title += " scheduled an event";
  } else if (activity.type === "file") {
    title += " added a file";
  } else if (activity.type === "invoice") {
    title += " added an invoice";
  } else if (activity.type === "inbox_message") {
    title += " sent a message";
  } else if (activity.type === "chat") {
    title += " chatted about a received message";
  }

  return (
    <Stack
      className={classnames(
        className,
        styles.timelineEntry,
        s({ mb: "small", p: "normal" }),
      )}
    >
      <Group justify="space-between">
        <Header as="h3">{title}</Header>
        <Text color="secondary">
          <Date output="compact" timestamp={activity.date} />
        </Text>
      </Group>

      <StrataActivityTimelineItemBody activity={activity} />

      <StatusButton
        className={styles.timelineEntryAddToAgendaButton}
        iconRight={<AddIcon />}
        onClick={() =>
          startTransition(() =>
            addItemToAgendaAction(
              meetingId,
              strataActivityToAgentItem(activity),
            ),
          )
        }
        isPending={isPending}
      >
        Add to Agenda
      </StatusButton>
    </Stack>
  );
}
