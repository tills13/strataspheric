import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { Date } from "../../../../../components/Date";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { ShareIcon } from "../../../../../components/Icon/ShareIcon";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { ThreadMessage } from "../../../../../components/ThreadMessage";
import { getThreadEmailParticipants } from "../../../../../data/emails/getThreadEmailParticipants";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { classnames } from "../../../../../utils/classnames";
import { approveOrRejectAmenityBookingAction } from "../../amenities/actions";
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
          <Header priority={2}>{subject}</Header>

          <ExternalLink
            href={"/dashboard/inbox/" + threadId + "?viewId=" + viewId}
            target="_blank"
          >
            <Button icon={<ShareIcon />} size="small" style="tertiary" />
          </ExternalLink>
        </Group>
        <Group>
          <Text color="secondary">
            {senderName} ({senderEmail}) &bull; <Date timestamp={sentAt} />
          </Text>
        </Group>
      </Stack>

      {messages.map((message) => (
        <ThreadMessage
          key={message.id}
          {...message}
          markInvoiceAsPaid={markInvoiceAsPaidAction}
          sendThreadChat={sendInboxThreadChatAction.bind(undefined, message.id)}
        />
      ))}

      {amenityBooking && (
        <InboxMessageThreadAmenityBooking
          amenityBooking={amenityBooking}
          approveOrRejectAmenityBooking={approveOrRejectAmenityBookingAction}
        />
      )}

      <SendInboxMessageForm
        className={s({ p: "normal" })}
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
    </div>
  );
}
