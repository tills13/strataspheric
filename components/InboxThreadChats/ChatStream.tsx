"use client";

import * as styles from "./style.css";

import React, { useLayoutEffect, useRef } from "react";

import { Chat } from "../../data/inbox/listThreadChats";
import { useSession } from "../../hooks/useSession";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { InboxThreadChat } from "./InboxThreadChat";

interface Props {
  chats: Chat[];
}

export function ChatStream({ chats }: Props) {
  const session = useSession();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  });

  let lastChatter: string | undefined = undefined;

  return (
    <Stack ref={ref} className={styles.chatStream} gap="small">
      {chats.length === 0 && (
        <Text color="secondary">
          No chats, yet. Start a conversation about this thread using the form
          below.
        </Text>
      )}
      {chats.map((chat) => {
        const isSelf = chat.userId === session?.user.id;
        const showChatter = !lastChatter || lastChatter !== chat.userId;

        lastChatter = chat.userId;

        return (
          <div
            className={
              isSelf ? styles.chatSelfMessageGroup : styles.chatMessageGroup
            }
            key={chat.id}
          >
            {showChatter && (
              <Text mb="small" fc="secondary">
                {chat.name}
              </Text>
            )}
            <InboxThreadChat key={chat.id} chat={chat} />
          </div>
        );
      })}
    </Stack>
  );
}
