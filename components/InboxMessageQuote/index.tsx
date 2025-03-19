import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { truncate } from "../../utils/truncate";
import { Date } from "../Date";
import { Group } from "../Group";
import { Header } from "../Header";
import { QuoteIcon } from "../Icon/QuoteIcon";
import { InternalLink } from "../Link/InternalLink";
import { Text } from "../Text";
import { Wrap } from "../Wrap";

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
    <Wrap
      if={linkType === "direct"}
      with={(children) => (
        <InternalLink
          className={classnames(styles.quotedMessage, className)}
          href={`/dashboard/inbox/${messageThreadId}#${messageId}`}
        >
          {children}
        </InternalLink>
      )}
      elseWith={(children) => (
        <a
          className={classnames(styles.quotedMessage, className)}
          href={"#" + messageId}
        >
          {children}
        </a>
      )}
    >
      <Group justify="space-between">
        <Header priority={3}>
          <QuoteIcon className={styles.quotedMessageIcon} /> {senderName}{" "}
          sent...
        </Header>
        <Text as="span">
          <Date output="compact" timestamp={timestamp} />
        </Text>
      </Group>

      <Text>
        {maxPreviewLength === -1
          ? message
          : truncate(message, maxPreviewLength)}
      </Text>
    </Wrap>
  );
}
