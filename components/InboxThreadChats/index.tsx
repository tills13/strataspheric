"use client";

import { useOptimistic } from "react";

import { Chat } from "../../data/inbox/getThreadChats";
import * as formdata from "../../utils/formdata";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { ChatStream } from "./ChatStream";

interface Props {
  chats: Chat[];
  threadId: string;
}

export function InboxThreadChats({ chats, threadId }: Props) {
  const [optisticChats, addOptimisticChat] = useOptimistic(
    chats,
    (chats, newChat: Chat) => {
      return [...chats, newChat];
    },
  );

  function optimisticOnSendInboxThreadChat(fd: FormData) {
    addOptimisticChat({
      chatId: "tmp",
      email: "s",
      id: "tmp",
      message: formdata.getString(fd, "message"),
      name: "You",
      sentAt: Date.now(),
    });
  }

  return (
    <>
      <ChatStream chats={optisticChats} />
      <SendInboxThreadChatForm
        onSendInboxThreadChat={optimisticOnSendInboxThreadChat}
        threadId={threadId}
      />
    </>
  );
}
