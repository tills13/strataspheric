import * as styles from "./style.css";

import { ComponentProps } from "react";

import { auth } from "../../auth";
import { InboxMessage } from "../../db";
import { getFiles } from "../../db/files/getFiles";
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
  strataId: string;
  threadId: string;
}

export async function InboxMessageThread({
  sendNewMessageAction,
  sendInboxThreadChatAction,
  strataId,
  threadId,
}: Props) {
  const files = await getFiles(strataId);
  const messages = await getInboxThreadMessages(threadId);
  const message0 = messages[0];

  const { senderName, senderEmail, subject, sentAt, viewId } = message0;

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
        availableFileAttachments={files}
        className={styles.newMessageForm}
        isFromNonMember={!message0.senderUserId}
        sendInboxMessageAction={sendNewMessageAction}
        showHeaders={false}
        showSubjectInput={false}
        {...(!message0.senderUserId && {
          defaultEmail: message0.senderEmail ?? undefined,
          defaultName: message0.senderName ?? undefined,
          defaultPhoneNumber: message0.senderPhoneNumber ?? undefined,
        })}
      />
    </div>
  );
}
