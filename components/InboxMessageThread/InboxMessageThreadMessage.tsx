"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { useHash } from "../../hooks/useHash";
import { classnames } from "../../utils/classnames";
import { parseTimestamp } from "../../utils/datetime";
import { Button } from "../Button";
import { FileLink } from "../FileLink";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { ChatIcon } from "../Icon/ChatIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { Modal } from "../Modal";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";

interface Props {
  id: string;
  filePath?: string | null;
  fileName?: string | null;
  message: string;
  senderName: string;
  senderEmail: string;
  sentAt: number;
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
  const can = useCan();
  const [showChatReplyModal, setShowChatReplyModal] = useState(false);
  const hash = useHash();

  return (
    <div
      key={id}
      id={id}
      className={classnames(
        hash === id ? styles.messageHighighted : styles.message,
      )}
    >
      <div className={styles.messageHeader}>
        <div>
          <h3>{senderName}</h3>
          <div>{senderEmail}</div>
        </div>
        <div className={styles.messageHeaderActions}>
          <span className={styles.messageHeaderSentAt}>
            Sent {parseTimestamp(sentAt).toLocaleString()}
          </span>
          {can(p("stratas", "inbox_thread_chats", "view")) && (
            <Button
              className={styles.chatActionButton}
              icon={<ChatIcon />}
              onClick={() => setShowChatReplyModal(true)}
              size="small"
              style="tertiary"
            />
          )}
        </div>
      </div>
      <p className={styles.messageText}>{message}</p>

      {filePath && (
        <FileLink path={filePath}>
          <div className={styles.messageFile}>
            <AttachmentIcon className={styles.messageFileAttachmentIcon} />
            {fileName}
          </div>
        </FileLink>
      )}

      {showChatReplyModal && (
        <Modal
          modalBodyClassName={styles.modalBodyClassName}
          closeModal={() => setShowChatReplyModal(false)}
          title="Chat about reply..."
        >
          <InboxMessageQuote
            maxPreviewLength={-1}
            messageId={id}
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
