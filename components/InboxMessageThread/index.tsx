import * as styles from "./style.css";

import { auth } from "../../auth";
import { getInboxThreadMessages } from "../../db/inbox/getInboxThreadMessages";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { ShareIcon } from "../Icon/ShareIcon";
import { IconButton } from "../IconButton";
import { ExternalLink } from "../Link/ExternalLink";
import { SendInboxMessageForm } from "../SendInboxMessageForm";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";

interface Props {
  sendInboxThreadChatAction: (fd: FormData) => void;
  sendNewMessageAction: (fd: FormData) => void;
  threadId: string;
}

export async function InboxMessageThread({
  sendNewMessageAction,
  sendInboxThreadChatAction,
  threadId,
}: Props) {
  const session = await auth();
  const messages = await getInboxThreadMessages(threadId);

  const {
    senderName,
    senderEmail,
    senderPhoneNumber,
    subject,
    sentAt,
    viewId,
  } = messages[0];

  return (
    <div className={styles.inboxMessageThreadContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageHeaderSubject}>{subject}</h2>
          <div className={styles.pageHeaderSender}>
            {senderName} ({senderEmail})
          </div>
        </div>
        <div className={styles.pageHeaderActions}>
          <span>Started {new Date(sentAt).toLocaleString()}</span>

          <ExternalLink
            href={"/dashboard/inbox/" + threadId + "?viewId=" + viewId}
            target="_blank"
          >
            <IconButton size="small">
              <ShareIcon />
            </IconButton>
          </ExternalLink>
        </div>
      </div>

      {messages.map((message) => (
        <div key={message.id} className={styles.message}>
          <div className={styles.messageHeader}>
            <div>
              <h3>{message.senderName}</h3>
              <div>{message.senderEmail}</div>
            </div>
            <span className={styles.messageHeaderSentAt}>
              Sent {new Date(message.sentAt).toLocaleString()}
            </span>
          </div>
          <p className={styles.messageText}>{message.message}</p>

          {message.filePath && (
            <ExternalLink href={message.filePath}>
              <div className={styles.messageFile}>
                <AttachmentIcon className={styles.messageFileAttachmentIcon} />
                {message.fileName}
                {message.fileDescription}
              </div>
            </ExternalLink>
          )}
          {/* <SendInboxThreadChatForm
            className={styles.messageChatForm}
            messageId={message.id}
            sendInboxThreadChatAction={sendInboxThreadChatAction}
          /> */}
        </div>
      ))}

      <SendInboxMessageForm
        className={styles.newMessageForm}
        isFromNonMember={!session}
        sendInboxMessageAction={sendNewMessageAction}
        showHeaders={false}
        showSubjectInput={false}
        {...(!session && {
          defaultEmail: senderEmail ?? undefined,
          defaultName: senderName ?? undefined,
          defaultPhoneNumber: senderPhoneNumber ?? undefined,
        })}
      />
    </div>
  );
}
