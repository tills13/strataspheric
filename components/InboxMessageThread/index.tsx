import * as styles from "./style.css";

import { auth } from "../../auth";
import { getThreadEmailParticipants } from "../../data/emails/getThreadEmailParticipants";
import { getThreadMessages } from "../../data/inbox/getThreadMessages";
import { parseTimestamp } from "../../utils/datetime";
import { Button } from "../Button";
import { Date } from "../Date";
import { ShareIcon } from "../Icon/ShareIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { SendInboxMessageForm } from "../SendInboxMessageForm";
import { InboxMessageThreadMessage } from "./InboxMessageThreadMessage";

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
  console.log(emailParticipants);

  return (
    <div className={styles.inboxMessageThreadContainer}>
      {session && !senderUserId && (
        <div className={styles.outsideMessageWarning}>
          This message is from outside your strata. Be careful sharing
          information that might be private.
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
        <InboxMessageThreadMessage
          key={message.id}
          {...message}
          sendInboxThreadChat={sendInboxThreadChatAction.bind(
            undefined,
            message.id,
          )}
        />
      ))}

      <SendInboxMessageForm
        className={styles.newMessageForm}
        showContactInformationFields={!session}
        sendInboxMessage={sendNewMessageAction}
        showHeaders={false}
        showSubjectInput={false}
        {...(!session && {
          defaultEmail: message0.senderEmail ?? undefined,
          defaultName: message0.senderName ?? undefined,
          defaultPhoneNumber: message0.senderPhoneNumber ?? undefined,
        })}
      />
    </div>
  );
}
