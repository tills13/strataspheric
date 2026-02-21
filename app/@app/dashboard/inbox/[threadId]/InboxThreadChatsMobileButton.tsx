"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { Button } from "../../../../../components/Button";
import { ChatIcon } from "../../../../../components/Icon/ChatIcon";
import { InboxThreadChats } from "../../../../../components/InboxThreadChats";
import { Modal } from "../../../../../components/Modal";
import { Thread } from "../../../../../data/inbox/getThread";
import { Chat } from "../../../../../data/inbox/listThreadChats";

interface Props {
  chats: Chat[];
  thread: Thread;
}

export function InboxThreadChatsMobileButton({ chats, thread }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileChatButton}>
      <Button
        color="primary"
        icon={<ChatIcon />}
        onClick={() => setIsOpen(true)}
        iconTextBehaviour="centerRemainder"
      >
        Thread Chat
      </Button>
      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)} title={thread.subject}>
          <InboxThreadChats chats={chats} threadId={thread.id} />
        </Modal>
      )}
    </div>
  );
}
