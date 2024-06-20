"use client";

import * as styles from "./style.css";

import React, { useLayoutEffect, useRef } from "react";

import { Chat } from "../../data/inbox/getThreadChats";
import { Header } from "../Header";
import { InfoPanel } from "../InfoPanel";
import { InboxThreadChat } from "./InboxThreadChat";

interface Props {
  chats: Chat[];
  subject: React.ReactNode;
}

export function ChatStream({ chats, subject }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    ref.current.scrollTo({ top: ref.current.scrollHeight });
  });

  return (
    <div className={styles.chatStream} ref={ref}>
      <Header className={styles.chatsHeader} priority={2}>
        Chat about &quot;{subject}&quot;
      </Header>

      <InfoPanel level="info">
        Chats are private with authorized members of the council or individuals
        who are explicitly given the ability to see and engage with chats.
      </InfoPanel>

      {chats.length === 0 && (
        <p className={styles.chatStreamNoChats}>
          No chats, yet. Start a conversation about this thread using the form
          below.
        </p>
      )}
      {chats.map((chat) => (
        <InboxThreadChat key={chat.id} {...chat} />
      ))}
    </div>
  );
}
