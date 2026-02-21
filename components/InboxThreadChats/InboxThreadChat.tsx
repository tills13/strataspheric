"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import {
  type Chat,
  isThreadChatWithFile,
  isThreadChatWithQuote,
} from "../../data/inbox/listThreadChats";
import { useSession } from "../../hooks/useSession";
import { classnames } from "../../utils/classnames";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface InboxTheadChatProps {
  chat: Chat;
}

export function InboxThreadChat({ chat }: InboxTheadChatProps) {
  const session = useSession();
  const isSelf = chat.userId === session?.user.id;

  console.log(chat);

  return (
    <Stack
      className={classnames(
        isSelf ? styles.selfChatBubble : styles.chatBubble,
        s({ p: "normal" }),
      )}
      gap="small"
    >
      {isThreadChatWithQuote(chat) && (
        <InboxMessageQuote
          source={{
            id: chat.quotedMessageId,
            threadId: chat.threadId,
            message: chat.quotedMessageMessage,
            senderName: chat.quotedMessageSender,
            sentAt: chat.quotedMessageTimestamp,
          }}
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
