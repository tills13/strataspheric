"use client";

import * as styles from "./style.css";

import React, { useLayoutEffect, useRef } from "react";

import { Chat } from "../../data/inbox/getThreadChats";
import { Header } from "../Header";
import { InfoPanel } from "../InfoPanel";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { InboxThreadChat } from "./InboxThreadChat";

interface Props {
  chats: Chat[];
}

export function ChatStream({ chats }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  });

  return (
    <Stack ref={ref}>
      {chats.length === 0 && (
        <Text color="secondary">
          No chats, yet. Start a conversation about this thread using the form
          below.
        </Text>
      )}
      {chats.map((chat) => (
        <InboxThreadChat key={chat.id} {...chat} />
      ))}
    </Stack>
  );
}
