"use client";

import { useOptimistic } from "react";

import { Chat } from "../../data/inbox/listThreadChats";
import { useSession } from "../../hooks/useSession";
import * as formdata from "../../utils/formdata";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { ChatStream } from "./ChatStream";

interface Props {
  chats: Chat[];
  threadId: string;
}

export function InboxThreadChats({ chats, threadId }: Props) {
  const session = useSession(true);
  const [optisticChats, addOptimisticChat] = useOptimistic(
    chats,
    (chats, newChat: Chat) => {
      return [...chats, newChat];
    },
  );

  function optimisticOnSendInboxThreadChat(fd: FormData) {
    addOptimisticChat({
      chatId: "TMP_CHAT",
      email: session.user.email,
      id: "tmp",
      message: formdata.getString(fd, "message"),
      name: session.user.name,
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
