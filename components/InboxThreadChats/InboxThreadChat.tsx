"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";

import {
  type Chat,
  isThreadChatWithFile,
  isThreadChatWithQuote,
} from "../../data/inbox/getThreadChats";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { FileLink } from "../FileLink";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";

interface Props {}

export function InboxThreadChat({ ...chat }: Props & Chat) {
  const { data: session } = useSession();
  const currentUser = session?.user!;

  return (
    <div
      className={classnames(
        chat.userId === currentUser.id
          ? styles.selfChatBubble
          : styles.chatBubble,
      )}
    >
      <div className={styles.chatBubbleHeader}>
        <Header priority={3}>{chat.name} said...</Header>
        <Date
          className={styles.chatBubbleTimestamp}
          output="date"
          timestamp={chat.sentAt}
        />
      </div>

      {isThreadChatWithQuote(chat) && (
        <InboxMessageQuote
          className={styles.quotedMessage}
          messageThreadId={chat.threadId}
          messageId={chat.quotedMessageId}
          message={chat.quotedMessageMessage}
          senderName={chat.quotedMessageSender}
          timestamp={chat.quotedMessageTimestamp}
          linkType="hash"
        />
      )}

      <p className={styles.chatMessage}>{chat.message}</p>

      {isThreadChatWithFile(chat) && (
        <FileLink path={chat.filePath}>
          <div className={styles.chatFile}>
            <AttachmentIcon className={styles.chatFileAttachmentIcon} />
            {chat.fileName}
          </div>
        </FileLink>
      )}
    </div>
  );
}
