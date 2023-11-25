"use client";

import * as styles from "./style.css";

import { type Thread } from "../../data/inbox/getThreads";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { DeleteButton } from "../DeleteButton";
import { InternalLink } from "../Link/InternalLink";

interface Props {
  deleteThread: (threadId: string) => void;
  threads: Array<Thread>;
}

export function InboxThreads({ deleteThread, threads }: Props) {
  const can = useCan();

  return (
    <div className={styles.inboxMessages}>
      <div className={styles.inboxMessagesContainer}>
        {threads.length === 0 && (
          <div className={styles.inboxMessagesTableRow}>
            <div className={styles.tableCell}>No Messages</div>
          </div>
        )}

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
              {new Date(thread.sentAt).toLocaleString()}
            </div>
            <div className={styles.actionsCell}>
              {can(p("stratas", "inbox_messages", "delete")) && (
                <DeleteButton
                  onClick={deleteThread.bind(undefined, thread.threadId)}
                  size="small"
                />
              )}
            </div>
          </InternalLink>
        ))}
      </div>
    </div>
  );
}
