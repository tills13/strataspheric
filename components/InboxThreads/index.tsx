"use client";

import * as styles from "./style.css";

import { type Thread } from "../../data/inbox/getThreads";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { Date } from "../Date";
import { DeleteButton } from "../DeleteButton";
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

      <div className={styles.inboxMessagesContainer}>
        {threads.map((thread) => (
          <InternalLink
            key={thread.id}
            className={styles.inboxMessagesTableRow}
            href={{
              pathname: "/dashboard/inbox/" + thread.threadId,
            }}
          >
            <div className={styles.statusCell}>
              {thread.isUnread === 1 && <span className={styles.unreadDot} />}
            </div>
            <div className={styles.senderNameCell}>{thread.senderName}</div>
            <div className={styles.subjectCell}>{thread.subject}</div>
            <div className={styles.messageCell}>
              {thread.message.split("\n")[0].substring(0, 100)}
            </div>
            <div className={styles.chatsCell}>
              {(thread.numChats || 0).toString()} chats
            </div>
            <div className={styles.sentAtCell}>
              <Date timestamp={thread.sentAt} />
            </div>
            <div className={styles.actionsCell}>
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
            </div>
          </InternalLink>
        ))}
      </div>
    </div>
  );
}
