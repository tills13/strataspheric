"use client";

import * as styles from "./style.css";

import { useOptimistic } from "react";

import { InboxMessage } from "../../data";
import { Chat } from "../../data/inbox/getThreadChats";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { ChatStream } from "./ChatStream";

interface Props {
  chats: Chat[];
  sendInboxThreadChat: (fd: FormData) => void;
  thread: InboxMessage[];
}

export function InboxThreadChats({
  chats,
  sendInboxThreadChat,
  thread,
}: Props) {
  const [optisticChats, addOptimisticChat] = useOptimistic(
    chats,
    (chats, newChat: Chat) => {
      return [...chats, newChat];
    },
  );

  function optimisticSendInboxThreadChat(fd: FormData) {
    addOptimisticChat({
      chatId: "tmp",
      email: "s",
      id: "tmp",
      message: fd.get("message") as string,
      name: "You",
    });
    sendInboxThreadChat(fd);
  }

  return (
    <div className={styles.wrapper}>
      <ChatStream chats={optisticChats} subject={thread[0].subject} />

      <SendInboxThreadChatForm
        sendInboxThreadChat={optimisticSendInboxThreadChat}
      />
    </div>
  );
}
