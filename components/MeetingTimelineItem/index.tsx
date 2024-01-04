"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { startTransition } from "react";

import { type AgendaTimelineEntry } from "../../app/@app/(app)/dashboard/meetings/[meetingId]/MeetingTimelineSearch";
import { classnames } from "../../utils/classnames";
import { parseTimestamp } from "../../utils/datetime";
import { Button } from "../Button";
import { Date } from "../Date";
import { ElementGroup } from "../ElementGroup";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { MeetingTimelineIcon } from "../MeetingTimelineIcon";

interface Props extends AgendaTimelineEntry {
  addItemToAgenda: () => void;
  className?: string;
}

export function MeetingTimelineItem({
  addItemToAgenda,
  className,
  sourceUserName,
  date,
  title: itemTitle,
  description,
  type,
  filePath,
}: Props) {
  let title = sourceUserName || "Someone";

  if (type === "event") {
    title += " scheduled an event";
  } else if (type === "file") {
    title += " added a file";
  } else if (type === "inbox_message") {
    title += " sent a message";
  } else if (type === "chat") {
    title += " chatted about a received message";
  }

  console.log(date, parseTimestamp(date).toLocaleString());

  return (
    <>
      <div className={classnames(styles.timelineEntry, s({ mb: "small" }))}>
        <div className={styles.timelineEntryHeader}>
          <Header priority={3}>{title}</Header>
          <Date
            className={styles.timelineEntryDate}
            output="date"
            timestamp={date}
          />
        </div>

        {type === "file" ? (
          <FileAttachmentChip
            className={styles.timelineAttachment}
            fileName={itemTitle}
            filePath={filePath}
          />
        ) : type === "inbox_message" ? (
          <InboxMessageQuote
            senderName={sourceUserName || "Someone"}
            message={description}
            timestamp={date}
          />
        ) : (
          <p className={styles.timelineEntryMessage}>{description}</p>
        )}
      </div>

      <ElementGroup>
        <Button
          color="primary"
          style="secondary"
          iconRight={<AddIcon />}
          onClick={() =>
            startTransition(() => {
              addItemToAgenda();
            })
          }
        >
          Add to Agenda
        </Button>
      </ElementGroup>
    </>
  );
}
