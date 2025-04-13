"use client";

import { useOptimistic } from "react";

import { File } from "../../data";
import { Chat } from "../../data/inbox/getThreadChats";
import * as formdata from "../../utils/formdata";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { ChatStream } from "./ChatStream";

interface Props {
  chats: Chat[];
  sendInboxThreadChat: (fd: FormData) => void;
  upsertFile: (fd: FormData) => Promise<File>;
}

export function InboxThreadChats({
  chats,
  sendInboxThreadChat,
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
      message: formdata.getString(fd, "message"),
      name: "You",
      sentAt: Date.now(),
    });
    sendInboxThreadChat(fd);
  }

  return (
    <>
      <ChatStream chats={optisticChats} />

      <SendInboxThreadChatForm
        sendInboxThreadChat={optimisticSendInboxThreadChat}
        upsertFile={upsertFile}
      />
    </>
  );
}
