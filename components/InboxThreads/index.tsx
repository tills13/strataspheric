import * as styles from "./style.css";

import { Thread } from "../../data/inbox/getThread";
import { Date } from "../Date";
import { Group } from "../Group";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  threads: Thread[];
}

export function InboxThreads({ threads }: Props) {
  return (
    <>
      {threads.length === 0 && (
        <div className={styles.inboxMessagesNoMessages}>
          <Header as="h2">Inbox Zero 🎉</Header>
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
                <Header className={styles.inboxMessageSender} as="h3">
                  {thread.senderName}
                </Header>
                &mdash;
                <Text
                  className={styles.inboxMessageSubject}
                  color="secondary"
                  fontWeight="bold"
                >
                  {thread.subject}
                </Text>
              </Group>
              <Text color="secondary" fontSize="small">
                <Date timestamp={thread.sentAt} output="date" />
              </Text>
            </Stack>
          </InternalLink>
        ))}
      </div>
    </>
  );
}
