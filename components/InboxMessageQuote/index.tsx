import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { truncate } from "../../utils/truncate";
import { ConditionalWrapper } from "../ConditionalWrapper";
import { Date } from "../Date";
import { Header } from "../Header";
import { QuoteIcon } from "../Icon/QuoteIcon";
import { InternalLink } from "../Link/InternalLink";

interface Props {
  className?: string;
  maxPreviewLength?: number;
  messageId: string;
  messageThreadId: string;
  message: string;
  senderName: string;
  timestamp: number;
  linkType?: "hash" | "direct";
}

export function InboxMessageQuote({
  className,
  linkType = "hash",
  maxPreviewLength = 200,
  messageId,
  messageThreadId,
  message,
  senderName,
  timestamp,
}: Props) {
  return (
    <ConditionalWrapper
      predicate={linkType === "direct"}
      wrapTrue={(children) => (
        <InternalLink
          className={classnames(styles.quotedMessage, className)}
          href={`/dashboard/inbox/${messageThreadId}#${messageId}`}
        >
          {children}
        </InternalLink>
      )}
      wrapFalse={(children) => (
        <a
          className={classnames(styles.quotedMessage, className)}
          href={"#" + messageId}
        >
          {children}
        </a>
      )}
    >
      <div className={styles.quotedMessageHeader}>
        <Header priority={3}>
          <QuoteIcon className={styles.quotedMessageIcon} /> {senderName}{" "}
          sent...
        </Header>
        <Date
          className={styles.quotedMessageTimestamp}
          output="date"
          timestamp={timestamp}
        />
      </div>

      <p className={styles.quotedMessageMessage}>
        {maxPreviewLength === -1
          ? message
          : truncate(message, maxPreviewLength)}
      </p>
    </ConditionalWrapper>
  );
}
