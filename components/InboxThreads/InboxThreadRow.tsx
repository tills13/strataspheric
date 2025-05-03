import * as styles from "./style.css";

import { deleteThreadAction } from "../../app/@app/dashboard/inbox/actions";
import { Thread } from "../../data/inbox/getThread";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Date } from "../Date";
import { Group } from "../Group";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { BedIcon } from "../Icon/BedIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { InternalLink } from "../Link/InternalLink";
import { RemoveButton } from "../RemoveButton";
import { Text } from "../Text";

interface Props {
  thread: Thread;
}

export function InboxThreadRow({ thread }: Props) {
  return (
    <div key={thread.id} className={styles.inboxMessage}>
      <Checkbox className={styles.inboxMessageCheckbox} />

      <Text whiteSpace="nowrap">{thread.senderName}</Text>

      <InternalLink
        className={styles.inboxMessageSubjectMessage}
        href={{ pathname: "/dashboard/inbox/" + thread.threadId }}
        noUnderline
      >
        <Group gap="xs">
          <Text
            className={styles.inboxMessageSubject}
            color="primary"
            fontWeight="bold"
          >
            {thread.subject}
          </Text>
          &mdash;
          <Text
            className={styles.inboxMessageSubject}
            color="secondary"
            flex={1}
          >
            {thread.message.split("\n")[0]}
          </Text>
          {thread.fileId && <AttachmentIcon size="xs" />}
          {thread.invoiceId && <PaidDocumentIcon size="xs" />}
          {thread.amenityBookingId && <BedIcon size="xs" />}
        </Group>
      </InternalLink>

      <Group justify="end">
        <Date
          timestamp={thread.sentAt}
          output="compact"
          color="secondary"
          fontSize="small"
          whiteSpace="nowrap"
        />
      </Group>

      <div className={styles.inboxMessageActions}>
        <Group gap="small">
          <RemoveButton
            action={deleteThreadAction.bind(undefined, thread.threadId)}
            icon={<DeleteIcon />}
            size="small"
            style="tertiary"
            color="primary"
          />
          <Button
            size="small"
            icon={<ArchiveIcon />}
            style="tertiary"
            color="primary"
          />
        </Group>
      </div>
    </div>
  );
}
