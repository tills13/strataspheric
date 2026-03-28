import * as styles from "./style.css";

import {
  archiveThreadAction,
  deleteThreadAction,
  markThreadAsReadAction,
  markThreadAsUnreadAction,
  unarchiveThreadAction,
} from "../../app/@app/dashboard/inbox/actions";
import { Thread } from "../../data/inbox/getThread";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Date } from "../Date";
import { Group } from "../Group";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { BedIcon } from "../Icon/BedIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { EmailIcon } from "../Icon/EmailIcon";
import { EmailOpenIcon } from "../Icon/EmailOpenIcon";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { UnarchiveIcon } from "../Icon/UnarchiveIcon";
import { RemoveButton } from "../RemoveButton";
import { StatusButton } from "../StatusButton";
import { TableRow } from "../Table/TableRow";
import { Text } from "../Text";

interface Props {
  archived?: boolean;
  thread: Thread;
}

export function InboxThreadRow({ archived, thread }: Props) {
  const isUnread = thread.isUnread === 1;

  return (
    <TableRow
      actions={
        <Group gap="small">
          <form
            action={
              isUnread
                ? markThreadAsReadAction.bind(undefined, thread.threadId)
                : markThreadAsUnreadAction.bind(undefined, thread.threadId)
            }
          >
            <Button
              type="submit"
              size="small"
              icon={isUnread ? <EmailOpenIcon /> : <EmailIcon />}
              style="tertiary"
              color="primary"
            />
          </form>
          <StatusButton
            action={
              archived
                ? unarchiveThreadAction.bind(undefined, thread.threadId)
                : archiveThreadAction.bind(undefined, thread.threadId)
            }
            icon={archived ? <UnarchiveIcon /> : <ArchiveIcon />}
            size="small"
            style="tertiary"
            color="primary"
          />
          <RemoveButton
            action={deleteThreadAction.bind(undefined, thread.threadId)}
            icon={<DeleteIcon />}
            size="small"
            style="tertiary"
            color="primary"
          />
        </Group>
      }
      content={
        <Group>
          {isUnread && <div className={styles.unreadIndicator} />}
          <Text
            className={classnames(isUnread && styles.unreadText)}
            color="primary"
            whiteSpace="nowrap"
          >
            {thread.senderName}
          </Text>

          <Group flex={1} overflow="hidden">
            <Text
              className={classnames(
                styles.inboxMessageSubject,
                isUnread && styles.unreadText,
              )}
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

          <Group gap="small">
            {thread.fileId && <AttachmentIcon size="xxs" />}
            {thread.invoiceId && <PaidDocumentIcon size="xxs" />}
            {thread.amenityBookingId && <BedIcon size="xxs" />}
          </Group>
        </Group>
      }
      link={"/dashboard/inbox/" + thread.threadId}
      rowEnd={
        <Date
          timestamp={thread.sentAt}
          output="compact"
          color="secondary"
          fontSize="small"
          whiteSpace="nowrap"
        />
      }
      rowId={thread.threadId}
    />
  );
}
