"use client";

import * as styles from "./style.css";

import { Thread } from "../../data/inbox/getThread";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { Date } from "../Date";
import { DeleteButton } from "../DeleteButton";
import { Group } from "../Group";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  deleteThread: (threadId: string) => void;
  threads: Thread[];
}

export function InboxThreads({ deleteThread, threads }: Props) {
  const can = useCan();

  return (
    <>
      {threads.length === 0 && (
        <div className={styles.inboxMessagesNoMessages}>
          <Header priority={2}>Inbox Zero 🎉</Header>
          <p>There are no messages in your inbox.</p>
        </div>
      )}

      <div className={styles.inboxMessagesContainer}>
        {threads.map((thread) => (
          <InternalLink
            key={thread.id}
            className={styles.inboxMessage}
            href={{
              pathname: "/dashboard/inbox/" + thread.threadId,
            }}
          >
            <Stack gap="xs">
              <Group gap="small">
                <Header className={styles.inboxMessageSender} priority={3}>
                  {thread.senderName}
                </Header>
                &mdash;
                <Text
                  className={styles.inboxMessageSubject}
                  color="secondary"
                  weight="bold"
                >
                  {thread.subject}
                </Text>
              </Group>
              <Text color="secondary" size="small">
                <Date timestamp={thread.sentAt} output="date" />
              </Text>
            </Stack>

            <Group justify="end">
              {can(p("stratas", "inbox_messages", "delete")) && (
                <DeleteButton
                  onConfirmDelete={deleteThread.bind(
                    undefined,
                    thread.threadId,
                  )}
                  color="error"
                  size="small"
                  style="tertiary"
                />
              )}
            </Group>
          </InternalLink>
        ))}
      </div>
    </>
  );
}
