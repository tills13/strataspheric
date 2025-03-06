"use client";

import * as styles from "./style.css";

import { type Thread } from "../../data/inbox/getThreads";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { Date } from "../Date";
import { DeleteButton } from "../DeleteButton";
import { Group } from "../Group";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";

interface Props {
  deleteThread: (threadId: string) => void;
  threads: Array<Thread>;
}

export function InboxThreads({ deleteThread, threads }: Props) {
  const can = useCan();

  return (
    <div className={styles.inboxMessages}>
      {threads.length === 0 && (
        <div className={styles.inboxMessagesNoMessages}>
          <Header priority={2}>Inbox Zero 🎉</Header>
          <p>There are no messages in your inbox.</p>
        </div>
      )}

      {threads.map((thread) => (
        <InternalLink
          key={thread.id}
          className={styles.inboxMessage}
          href={{
            pathname: "/dashboard/inbox/" + thread.threadId,
          }}
        >
          <Group align="center" justify="space-between">
            <Group>
              <b>{thread.subject}</b>
              <Date timestamp={thread.sentAt} output="date" />
              <p>{thread.message.split("\n")[0].substring(0, 100)}</p>
            </Group>
            <Group>
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
          </Group>
        </InternalLink>
      ))}
    </div>
  );
}
