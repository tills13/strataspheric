import * as styles from "./style.css";

import { InboxMessage } from "../../db";
import { classnames } from "../../utils/classnames";
import { InternalLink } from "../Link/InternalLink";

interface Props {
  messages: Array<InboxMessage & { numChats: string | number | null | bigint }>;
}

export function InboxMessages({ messages }: Props) {
  return (
    <div className={styles.inboxMessagesContainer}>
      {messages.length === 0 && (
        <div className={styles.inboxMessagesTableRow}>
          <div className={styles.inboxMessagesTableCell}>No Messages</div>
        </div>
      )}
      {messages.map((message) => (
        <InternalLink
          key={message.id}
          className={styles.inboxMessagesTableRow}
          href={{
            pathname: "/dashboard/inbox/" + message.threadId,
          }}
        >
          <div className={styles.statusCell}>
            {message.isUnread === 1 && <span className={styles.unreadDot} />}
          </div>
          <div className={styles.senderNameCell}>{message.senderName}</div>
          <div className={styles.subjectCell}>{message.subject}</div>
          <div className={styles.messageCell}>
            {message.message.split("\n")[0].substring(0, 100)}
          </div>
          <div className={styles.chatsCell}>
            {(message.numChats || 0).toString()} chats
          </div>
          <div className={styles.sentAtCell}>
            {new Date(message.sentAt).toLocaleString()}
          </div>
        </InternalLink>
      ))}
    </div>
  );
}
