"use client";

import * as styles from "./style.css";

import React, { startTransition } from "react";

import { type AgendaTimelineEntry } from "../../app/@app/(app)/dashboard/meetings/[meetingId]/MeetingTimelineSearch";
import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Header } from "../Header";
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

  return (
    <div className={styles.timelineItemContainer}>
      <MeetingTimelineIcon className={styles.timelineIcon} type={type} />

      <div className={styles.timelineItem}>
        <div className={styles.timelineEntry}>
          <div className={styles.timelineEntryHeader}>
            <Header priority={3}>{title}</Header>
            <span className={styles.timelineEntryDate}>
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          {type === "file" ? (
            <FileAttachmentChip
              className={styles.timelineAttachment}
              fileName={itemTitle}
              filePath={description}
            />
          ) : (
            <p>{description}</p>
          )}
        </div>

        <ElementGroup>
          <Button
            onClick={() =>
              startTransition(() => {
                addItemToAgenda();
              })
            }
          >
            Add to Agenda
          </Button>
        </ElementGroup>
      </div>
    </div>
  );
}
