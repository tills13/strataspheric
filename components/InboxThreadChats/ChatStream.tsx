"use client";

import * as styles from "./style.css";

import React, { useLayoutEffect, useRef } from "react";

import { Chat } from "../../db/inbox/getThreadChats";
import { Header } from "../Header";
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

      {chats.length === 0 && (
        <p>
          No chats, yet. Start a conversation about this thread using the form
          below. Chats are private with authorized members of the council or
          individuals who are explicitly given the ability to see and engage
          with chats.
        </p>
      )}
      {chats.map((chat) => (
        <InboxThreadChat key={chat.id} {...chat} />
      ))}
    </div>
  );
}
