"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import {
  type Chat,
  isThreadChatWithFile,
  isThreadChatWithQuote,
} from "../../data/inbox/getThreadChats";
import { useSession } from "../../hooks/useSession";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Group } from "../Group";
import { Header } from "../Header";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {}

export function InboxThreadChat({ ...chat }: Props & Chat) {
  const session = useSession();

  return (
    <Stack
      className={classnames(
        chat.userId === session?.user.id
          ? styles.selfChatBubble
          : styles.chatBubble,
        s({ p: "normal" }),
      )}
    >
      <Group justify="space-between">
        <Header as="h3">{chat.name} said...</Header>
        <Text as="span">
          <Date output="compact" timestamp={chat.sentAt} />
        </Text>
      </Group>

      {isThreadChatWithQuote(chat) && (
        <InboxMessageQuote
          messageThreadId={chat.threadId}
          messageId={chat.quotedMessageId}
          source={chat.quotedMessageMessage}
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
