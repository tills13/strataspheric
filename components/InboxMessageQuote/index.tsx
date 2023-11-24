import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { truncate } from "../../utils/truncate";
import { Header } from "../Header";
import { QuoteIcon } from "../Icon/QuoteIcon";

interface Props {
  className?: string;
  maxPreviewLength?: number;
  message: string;
  senderName: string;
  timestamp: string;
}

export function InboxMessageQuote({
  className,
  maxPreviewLength = 200,
  message,
  senderName,
  timestamp,
}: Props) {
  return (
    <div className={classnames(styles.quotedMessage, className)}>
      <div className={styles.quotedMessageHeader}>
        <Header priority={3}>
          <QuoteIcon className={styles.quotedMessageIcon} /> {senderName}{" "}
          sent...
        </Header>
        <span className={styles.quotedMessageTimestamp}>
          {new Date(timestamp).toDateString()}
        </span>
      </div>

      <p className={styles.quotedMessageMessage}>
        {maxPreviewLength === -1
          ? message
          : truncate(message, maxPreviewLength)}
      </p>
    </div>
  );
}
