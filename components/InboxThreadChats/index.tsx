"use client";

import * as styles from "./style.css";

import { useOptimistic } from "react";

import { File, InboxMessage } from "../../data";
import { Chat } from "../../data/inbox/getThreadChats";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { ChatStream } from "./ChatStream";

interface Props {
  chats: Chat[];
  sendInboxThreadChat: (fd: FormData) => void;
  thread: InboxMessage[];
  upsertFile: (fd: FormData) => Promise<File>;
}

export function InboxThreadChats({
  chats,
  sendInboxThreadChat,
  thread,
  upsertFile,
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
      sentAt: Date.now(),
    });
    sendInboxThreadChat(fd);
  }

  return (
    <div className={styles.wrapper}>
      <ChatStream chats={optisticChats} subject={thread[0].subject} />

      <SendInboxThreadChatForm
        className={styles.form}
        sendInboxThreadChat={optimisticSendInboxThreadChat}
        upsertFile={upsertFile}
      />
    </div>
  );
}
