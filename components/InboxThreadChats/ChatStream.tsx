"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import React, { useLayoutEffect, useRef } from "react";

import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { ExternalLink } from "../Link/ExternalLink";

interface Props {
  chats: Array<{
    id: string;
    quotedMessageMessage?: string | null;
    quotedMessageTimestamp?: string | null;
    quotedMessageSender?: string | null;
    message: string;
    name: string;
    sentAt: string;
    userId: string;
    filePath?: string | null;
    fileName?: string | null;
  }>;
  subject: React.ReactNode;
}

export function ChatStream({ chats, subject }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    console.log(ref.current.scrollHeight);
    ref.current.scrollTo({ top: ref.current.scrollHeight });
  });

  return (
    <div className={styles.chatStream} ref={ref}>
      <Header className={styles.chatsHeader} priority={2}>
        Chat about &quot;{subject}&quot;
      </Header>

      {chats.length === 0 && (
        <p>
          No chats, yet. Start a conversation about this thread using the form
          below. Chats are private with authorized members of the council or
          individuals who are explicitly given the ability to see and engage
          with chats.
        </p>
      )}
      {chats.map((chat) => {
        return (
          <div
            key={chat.id}
            className={
              chat.userId === session!.user!.id
                ? styles.selfChatBubble
                : styles.chatBubble
            }
          >
            <div className={styles.chatBubbleHeader}>
              <Header priority={3}>{chat.name} said...</Header>
              <span className={styles.chatBubbleTimestamp}>
                {new Date(chat.sentAt).toDateString()}
              </span>
            </div>

            {chat.quotedMessageMessage &&
              chat.quotedMessageTimestamp &&
              chat.quotedMessageSender && (
                <InboxMessageQuote
                  className={styles.quotedMessage}
                  message={chat.quotedMessageMessage}
                  senderName={chat.quotedMessageSender}
                  timestamp={chat.quotedMessageTimestamp}
                />
              )}

            <p className={styles.chatMessage}>{chat.message}</p>

            {chat.filePath && (
              <ExternalLink href={chat.filePath}>
                <div className={styles.chatFile}>
                  <AttachmentIcon className={styles.chatFileAttachmentIcon} />
                  {chat.fileName}
                </div>
              </ExternalLink>
            )}
          </div>
        );
      })}
    </div>
  );
}
