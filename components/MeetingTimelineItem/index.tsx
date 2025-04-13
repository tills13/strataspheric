"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useTransition } from "react";

import type { StrataActivity } from "../../app/api/stratas/listActivity/route";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Group } from "../Group";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  addItemToAgenda: () => void;
  className?: string;
}

function MeetingTimelineItemBody(item: Props & StrataActivity) {
  let sourceUserName = item.sourceUserName || "Someone";

  if (item.type === "file") {
    return (
      <FileAttachmentChip fileName={item.fileName} filePath={item.filePath} />
    );
  } else if (item.type === "invoice") {
    return (
      <InvoiceChip
        invoice={{
          amount: item.invoiceAmount,
          description: item.invoiceDescription,
          id: item.invoiceId,
          identifier: item.invoiceIdentifier,
          isPaid: item.invoiceIsPaid,
          status: "final",
        }}
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

  return <p>{item.eventName}</p>;
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
    <Stack
      className={classnames(
        className,
        styles.timelineEntry,
        s({ mb: "small", p: "normal" }),
      )}
    >
      <Group justify="space-between">
        <Header priority={3}>{title}</Header>
        <Text color="secondary">
          <Date output="compact" timestamp={item.date} />
        </Text>
      </Group>

      <MeetingTimelineItemBody {...props} />

      <StatusButton
        className={styles.timelineEntryAddToAgendaButton}
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
    </Stack>
  );
}
