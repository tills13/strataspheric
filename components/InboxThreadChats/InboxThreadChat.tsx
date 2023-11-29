"use client";

import * as styles from "./style.css";

import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  type Chat,
  isThreadChatWithFile,
  isThreadChatWithQuote,
} from "../../data/inbox/getThreadChats";
import { classnames } from "../../utils/classnames";
import { FileLink } from "../FileLink";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";

interface Props {
  currentUser: User;
}

export function InboxThreadChat({ currentUser, ...chat }: Props & Chat) {
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
        <span className={styles.chatBubbleTimestamp}>
          {new Date(chat.sentAt).toDateString()}
        </span>
      </div>

      {isThreadChatWithQuote(chat) && (
        <InboxMessageQuote
          className={styles.quotedMessage}
          messageId={chat.quotedMessageId}
          message={chat.quotedMessageMessage}
          senderName={chat.quotedMessageSender}
          timestamp={chat.quotedMessageTimestamp}
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
