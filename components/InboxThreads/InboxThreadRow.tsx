import * as styles from "./style.css";

import { deleteThreadAction } from "../../app/@app/dashboard/inbox/actions";
import { Thread } from "../../data/inbox/getThread";
import { Button } from "../Button";
import { Date } from "../Date";
import { Group } from "../Group";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { BedIcon } from "../Icon/BedIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { RemoveButton } from "../RemoveButton";
import { TableRow } from "../Table/TableRow";
import { Text } from "../Text";

interface Props {
  thread: Thread;
}

export function InboxThreadRow({ thread }: Props) {
  return (
    <TableRow
      actions={
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
      }
      content={
        <Group>
          <Text color="primary" whiteSpace="nowrap">
            {thread.senderName}
          </Text>

          <Group flex={1}>
            <Text
              className={styles.inboxMessageSubject}
              color="primary"
              fontWeight="bold"
            >
              {thread.subject}
            </Text>

            <Text
              className={styles.inboxMessageSubject}
              color="secondary"
              flex={1}
            >
              {thread.message.split("\n")[0]}
            </Text>
          </Group>

          {thread.fileId && <AttachmentIcon size="xs" />}
          {thread.invoiceId && <PaidDocumentIcon size="xs" />}
          {thread.amenityBookingId && <BedIcon size="xs" />}
        </Group>
      }
      link={{ pathname: "/dashboard/inbox/" + thread.threadId }}
      rowEnd={
        <Date
          timestamp={thread.sentAt}
          output="compact"
          color="secondary"
          fontSize="small"
          whiteSpace="nowrap"
        />
      }
    />
  );
}
