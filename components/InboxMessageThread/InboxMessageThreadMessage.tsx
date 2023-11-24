"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { ChatIcon } from "../Icon/ChatIcon";
import { IconButton } from "../IconButton";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { ExternalLink } from "../Link/ExternalLink";
import { Modal } from "../Modal";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";

interface Props {
  id: string;
  filePath?: string | null;
  fileName?: string | null;
  message: string;
  senderName: string;
  senderEmail: string;
  sentAt: string;
  sendInboxThreadChat: (fd: FormData) => void;
}

export function InboxMessageThreadMessage({
  id,
  message,
  fileName,
  filePath,
  senderEmail,
  senderName,
  sentAt,
  sendInboxThreadChat,
}: Props) {
  const [showChatReplyModal, setShowChatReplyModal] = useState(false);

  return (
    <div key={id} className={styles.message}>
      <div className={styles.messageHeader}>
        <div>
          <h3>{senderName}</h3>
          <div>{senderEmail}</div>
        </div>
        <div className={styles.messageHeaderActions}>
          <span className={styles.messageHeaderSentAt}>
            Sent {new Date(sentAt).toLocaleString()}
          </span>
          <IconButton
            className={styles.chatActionButton}
            onClick={() => setShowChatReplyModal(true)}
            size="small"
          >
            <ChatIcon />
          </IconButton>
        </div>
      </div>
      <p className={styles.messageText}>{message}</p>

      {filePath && (
        <ExternalLink href={filePath}>
          <div className={styles.messageFile}>
            <AttachmentIcon className={styles.messageFileAttachmentIcon} />
            {fileName}
          </div>
        </ExternalLink>
      )}

      {showChatReplyModal && (
        <Modal
          modalBodyClassName={styles.modalBodyClassName}
          closeModal={() => setShowChatReplyModal(false)}
          title="Chat about reply..."
        >
          <InboxMessageQuote
            maxPreviewLength={-1}
            message={message}
            senderName={senderName}
            timestamp={sentAt}
          />

          <SendInboxThreadChatForm
            className={styles.messageChatForm}
            sendInboxThreadChat={sendInboxThreadChat}
          />
        </Modal>
      )}
    </div>
  );
}