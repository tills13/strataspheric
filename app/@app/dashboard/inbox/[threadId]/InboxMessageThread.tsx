import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import differenceInDays from "date-fns/differenceInDays";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { Date } from "../../../../../components/Date";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { EventIcon } from "../../../../../components/Icon/EventIcon";
import { ShareIcon } from "../../../../../components/Icon/ShareIcon";
import { InvoiceChip } from "../../../../../components/InvoiceChip";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { Panel } from "../../../../../components/Panel";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { ThreadMessage } from "../../../../../components/ThreadMessage";
import { Timeline } from "../../../../../components/Timeline";
import { getThreadEmailParticipants } from "../../../../../data/emails/getThreadEmailParticipants";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { classnames } from "../../../../../utils/classnames";
import { parseTimestamp } from "../../../../../utils/datetime";
import { upsertFileAction } from "../../files/actions";
import {
  markInvoiceAsPaidAction,
  upsertInvoiceAction,
} from "../../invoices/actions";
import { InboxMessageThreadAmenityBooking } from "./InboxMessageThreadAmenityBooking";

interface Props {
  sendInboxThreadChatAction: (messageId: string, fd: FormData) => void;
  sendNewMessageAction: (fd: FormData) => void;
  threadId: string;
}

export async function InboxMessageThread({
  sendNewMessageAction,
  sendInboxThreadChatAction,
  threadId,
}: Props) {
  const [session, messages] = await Promise.all([
    auth(),
    getThreadMessages(threadId),
  ]);

  const message0 = messages[0];

  const {
    amenityBooking,
    senderUserId,
    senderName,
    senderEmail,
    subject,
    sentAt,
    viewId,
  } = message0;

  // console.log(message0);

  const emailParticipants = await getThreadEmailParticipants(threadId);

  return (
    <div className={styles.inboxMessageThreadContainer}>
      {session && !senderUserId && (
        <div className={styles.outsideMessageWarning}>
          This message is from outside your strata. Be careful when sharing
          information that might be considered private.
        </div>
      )}

      <Stack
        className={classnames(styles.pageHeader, s({ p: "normal" }))}
        gap="xs"
      >
        <Group justify="space-between">
          <Group gap="small">
            <Header priority={2}>{subject}</Header>
            <Text as="span" color="secondary">
              <Date timestamp={sentAt} />
            </Text>
          </Group>
          <ExternalLink
            href={"/dashboard/inbox/" + threadId + "?viewId=" + viewId}
            target="_blank"
          >
            <Button icon={<ShareIcon />} size="small" style="tertiary" />
          </ExternalLink>
        </Group>
        <Text color="secondary">
          {senderName} ({senderEmail})
        </Text>
      </Stack>

      {messages.map((message) => (
        <ThreadMessage
          key={message.id}
          {...message}
          markInvoiceAsPaid={markInvoiceAsPaidAction}
          sendThreadChat={sendInboxThreadChatAction.bind(undefined, message.id)}
        />
      ))}

      {amenityBooking ? (
        <InboxMessageThreadAmenityBooking amenityBooking={amenityBooking} />
      ) : (
        <SendInboxMessageForm
          className={s({ p: "normal" })}
          defaultInvoiceId={message0.amenityBooking?.invoice}
          showContactInformationFields={!session}
          sendInboxMessage={sendNewMessageAction}
          showHeaders={false}
          showSubjectInput={false}
          upsertInvoice={upsertInvoiceAction.bind(undefined, undefined)}
          upsertFile={upsertFileAction.bind(undefined, undefined)}
          {...(!session && {
            defaultEmail: message0.senderEmail,
            defaultName: message0.senderName,
            defaultPhoneNumber: message0.senderPhoneNumber,
          })}
        />
      )}
    </div>
  );
}
