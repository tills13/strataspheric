"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";

import {
  type Chat,
  isThreadChatWithFile,
  isThreadChatWithQuote,
} from "../../data/inbox/getThreadChats";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { FileLink } from "../FileLink";
import { Group } from "../Group";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {}

export function InboxThreadChat({ ...chat }: Props & Chat) {
  const { data: session } = useSession();
  const currentUser = session?.user!;

  return (
    <Stack
      className={classnames(
        chat.userId === currentUser.id
          ? styles.selfChatBubble
          : styles.chatBubble,
        s({ p: "normal" }),
      )}
    >
      <Group justify="space-between">
        <Header priority={3}>{chat.name} said...</Header>
        <Text as="span">
          <Date output="compact" timestamp={chat.sentAt} />
        </Text>
      </Group>

      {isThreadChatWithQuote(chat) && (
        <InboxMessageQuote
          messageThreadId={chat.threadId}
          messageId={chat.quotedMessageId}
          message={chat.quotedMessageMessage}
          senderName={chat.quotedMessageSender}
          timestamp={chat.quotedMessageTimestamp}
          linkType="hash"
        />
      )}
      <Text>{chat.message}</Text>
      {isThreadChatWithFile(chat) && (
        <FileAttachmentChip fileName={chat.fileName} filePath={chat.filePath} />
      )}
    </Stack>
  );
}
