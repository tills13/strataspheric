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
  source: {
    id: string;
    message: string;
    senderName: string;
    sentAt: number;
    threadId: string;
  };
  linkType?: "hash" | "direct";
}

export function InboxMessageQuote({
  className,
  linkType = "hash",
  maxPreviewLength = 200,
  source,
}: Props) {
  return (
    <Wrap
      if={linkType === "direct"}
      with={(children) => (
        <InternalLink
          className={classnames(styles.quotedMessage, className)}
          href={`/dashboard/inbox/${source.threadId}#${source.id}`}
        >
          {children}
        </InternalLink>
      )}
      elseWith={(children) => (
        <a
          className={classnames(styles.quotedMessage, className)}
          href={"#" + source.id}
        >
          {children}
        </a>
      )}
    >
      <Group justify="space-between">
        <Header as="h3">
          <QuoteIcon className={styles.quotedMessageIcon} /> {source.senderName}{" "}
          sent...
        </Header>
        <Text as="span">
          <Date output="compact" timestamp={source.sentAt} />
        </Text>
      </Group>

      <Text>
        {maxPreviewLength === -1
          ? source.message
          : truncate(source.message, maxPreviewLength)}
      </Text>
    </Wrap>
  );
}
