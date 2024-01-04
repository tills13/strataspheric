import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { parseTimestamp } from "../../utils/datetime";
import { truncate } from "../../utils/truncate";
import { Header } from "../Header";
import { QuoteIcon } from "../Icon/QuoteIcon";

interface Props {
  className?: string;
  maxPreviewLength?: number;
  messageId: string;
  message: string;
  senderName: string;
  timestamp: number;
}

export function InboxMessageQuote({
  className,
  maxPreviewLength = 200,
  messageId,
  message,
  senderName,
  timestamp,
}: Props) {
  return (
    <a
      className={classnames(styles.quotedMessage, className)}
      href={"#" + messageId}
    >
      <div className={styles.quotedMessageHeader}>
        <Header priority={3}>
          <QuoteIcon className={styles.quotedMessageIcon} /> {senderName}{" "}
          sent...
        </Header>
        <span
          className={styles.quotedMessageTimestamp}
          suppressHydrationWarning
        >
          {parseTimestamp(timestamp).toDateString()}
        </span>
      </div>

      <p className={styles.quotedMessageMessage}>
        {maxPreviewLength === -1
          ? message
          : truncate(message, maxPreviewLength)}
      </p>
    </a>
  );
}
