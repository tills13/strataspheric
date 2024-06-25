"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useTransition } from "react";

import type { StrataActivity } from "../../app/api/stratas/listActivity/route";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { StatusButton } from "../StatusButton";

interface Props extends StrataActivity {
  addItemToAgenda: () => void;
  className?: string;
}

function MeetingTimelineItemBody(item: Props) {
  let sourceUserName = item.sourceUserName || "Someone";

  if (item.type === "file" || item.type === "invoice") {
    return (
      <FileAttachmentChip
        className={styles.timelineAttachment}
        fileName={item.fileName}
        filePath={item.filePath}
      />
    );
  } else if (item.type === "inbox_message") {
    return (
      <InboxMessageQuote
        senderName={sourceUserName}
        message={item.message}
        messageId={item.messageId}
        messageThreadId={item.messageThreadId}
        timestamp={item.date}
        linkType="direct"
      />
    );
  } else if (item.type === "chat") {
    return (
      <InboxMessageQuote
        senderName={sourceUserName}
        message={item.chatMessage}
        messageId={item.chatId}
        messageThreadId={item.chatThreadId}
        timestamp={item.date}
        linkType="direct"
      />
    );
  }

  return <p className={styles.timelineEntryMessage}>{item.eventName}</p>;
}

export function MeetingTimelineItem(props: Props) {
  const { addItemToAgenda, className, ...item } = props;

  const [isPending, startTransition] = useTransition();
  let sourceUserName = item.sourceUserName || "Someone";

  let title = sourceUserName;

  if (item.type === "event") {
    title += " scheduled an event";
  } else if (item.type === "file") {
    title += " added a file";
  } else if (item.type === "invoice") {
    title += " added an invoice";
  } else if (item.type === "inbox_message") {
    title += " sent a message";
  } else if (item.type === "chat") {
    title += " chatted about a received message";
  }

  return (
    <div className={classnames(styles.timelineEntry, s({ mb: "small" }))}>
      <div className={styles.timelineEntryHeader}>
        <Header priority={3}>{title}</Header>
        <Date
          className={styles.timelineEntryDate}
          output="date"
          timestamp={item.date}
        />
      </div>

      <MeetingTimelineItemBody {...props} />

      <StatusButton
        className={styles.timelineEntryAddToAgendaButton}
        style="tertiary"
        iconRight={<AddIcon />}
        onClick={() =>
          startTransition(() => {
            addItemToAgenda();
          })
        }
        isPending={isPending}
      >
        Add to Agenda
      </StatusButton>
    </div>
  );
}
