import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { Date } from "../../../../../components/Date";
import { ShareIcon } from "../../../../../components/Icon/ShareIcon";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { ThreadMessage } from "../../../../../components/ThreadMessage";
import { getThreadEmailParticipants } from "../../../../../data/emails/getThreadEmailParticipants";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { upsertFileAction } from "../../files/actions";
import {
  markInvoiceAsPaidAction,
  upsertInvoiceAction,
} from "../../invoices/actions";

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
  const session = await auth();
  const messages = await getThreadMessages(threadId);

  const message0 = messages[0];

  const { senderUserId, senderName, senderEmail, subject, sentAt, viewId } =
    message0;

  const emailParticipants = await getThreadEmailParticipants(threadId);

  return (
    <div className={styles.inboxMessageThreadContainer}>
      {session && !senderUserId && (
        <div className={styles.outsideMessageWarning}>
          This message is from outside your strata. Be careful when sharing
          information that might be considered private.
        </div>
      )}

      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageHeaderSubject}>{subject}</h2>
          <div className={styles.pageHeaderSender}>
            {senderName} ({senderEmail})
          </div>
        </div>

        <div className={styles.pageHeaderActions}>
          <div>
            Started <Date timestamp={sentAt} />
          </div>

          <ExternalLink
            href={"/dashboard/inbox/" + threadId + "?viewId=" + viewId}
            target="_blank"
          >
            <Button icon={<ShareIcon />} size="small" style="tertiary" />
          </ExternalLink>
        </div>
      </div>

      {messages.map((message) => (
        <ThreadMessage
          key={message.id}
          {...message}
          markInvoiceAsPaid={markInvoiceAsPaidAction}
          sendThreadChat={sendInboxThreadChatAction.bind(undefined, message.id)}
        />
      ))}

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
