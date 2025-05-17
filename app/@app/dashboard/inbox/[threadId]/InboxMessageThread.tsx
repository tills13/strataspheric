import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { NavigateBackButton } from "../../../../../components/DashboardLayout/NavigateBackButton";
import { Date } from "../../../../../components/Date";
import { FileAttachmentChip } from "../../../../../components/FileAttachmentChip";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { InvoiceChip } from "../../../../../components/InvoiceChip";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { SendInboxMessageContactDetailsFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageContactDetailsFields";
import { SendInboxMessageFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageFields";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { ThreadMessage } from "../../../../../components/ThreadMessage";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { classnames } from "../../../../../utils/classnames";
import { approveOrRejectAmenityBookingAction } from "../../amenities/actions";
// import { deleteThreadAction } from "../actions";
import { InboxMessageThreadAmenityBooking } from "./InboxMessageThreadAmenityBooking";

function Test() {
  return null;
}

interface Props {
  threadId: string;
}

export async function InboxMessageThread({ threadId }: Props) {
  const [session, allMessages] = await Promise.all([
    auth(),
    getThreadMessages(threadId),
  ]);

  const test = <Test />;
  console.log(test);

  const [message0, ...messages] = allMessages;

  const {
    amenityBooking,
    senderUserId,
    senderName,
    senderEmail,
    subject,
    sentAt,
    // viewId,
  } = message0;

  // const emailParticipants = await getThreadEmailParticipants(threadId);

  return (
    <div className={styles.inboxMessageThreadContainer}>
      {session && !senderUserId && (
        <div className={styles.outsideMessageWarning}>
          This message is from outside your strata. Be careful when sharing
          information that might be considered private.
        </div>
      )}

      <Stack className={classnames(styles.pageHeader)} p="normal">
        <Group justify="space-between" align="start">
          <Group gap="small" align="start">
            <NavigateBackButton />{" "}
            <Stack gap="xs">
              <Header as="h2">{subject}</Header>
              <Text as="span" color="secondary">
                {senderName} ({senderEmail}) &bull; <Date timestamp={sentAt} />
              </Text>
            </Stack>
          </Group>
        </Group>

        {message0.message && (
          <Text whiteSpace="pre-wrap">{message0.message}</Text>
        )}

        {message0.invoice && <InvoiceChip invoice={message0.invoice} />}

        {message0.file && (
          <FileAttachmentChip
            fileName={message0.file.name}
            filePath={message0.file.path}
          />
        )}
      </Stack>

      {messages.map((message, idx) =>
        message.message === "" ? null : (
          <ThreadMessage
            key={message.id}
            id={message.id}
            inboxThreadMessage={message}
            showSenderDetails={idx !== 0}
          />
        ),
      )}

      {amenityBooking && (
        <InboxMessageThreadAmenityBooking
          amenityBooking={amenityBooking}
          approveOrRejectAmenityBooking={approveOrRejectAmenityBookingAction}
        />
      )}

      <SendInboxMessageForm className={s({ p: "normal" })} threadId={threadId}>
        {!session && (
          <SendInboxMessageContactDetailsFields
            defaultEmail={message0.senderEmail}
            defaultName={message0.senderName}
            defaultPhoneNumber={message0.senderPhoneNumber}
            mb="large"
          />
        )}

        <SendInboxMessageFields showSubjectInput={false} />
      </SendInboxMessageForm>
    </div>
  );
}
