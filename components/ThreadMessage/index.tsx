"use client";

import * as styles from "./style.css";

import { useState, useTransition } from "react";

import { File, Invoice } from "../../data";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { useHash } from "../../hooks/useHash";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Date } from "../Date";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { ChatIcon } from "../Icon/ChatIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";
import { Modal } from "../Modal";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";

interface Props {
  id: string;
  file?: File;
  invoice?: Invoice;
  markInvoiceAsPaid: (invoiceId: string) => Promise<void>;
  message: string;
  senderName: string;
  senderEmail: string;
  sentAt: number;
  sendThreadChat: (fd: FormData) => void;
  threadId: string;
}

export function ThreadMessage({
  id,
  message,
  file,
  invoice,
  markInvoiceAsPaid,
  senderEmail,
  senderName,
  sentAt,
  sendThreadChat,
  threadId,
}: Props) {
  const can = useCan();
  const [showChatReplyModal, setShowChatReplyModal] = useState(false);
  const hash = useHash();

  const [markIsPaidIsPending, startTransition] = useTransition();

  return (
    <>
      <div
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
              Sent <Date timestamp={sentAt} />
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

        {invoice && (
          <div className={styles.messageInvoice}>
            <InvoiceChip
              invoice={invoice}
              markInvoiceAsPaid={markInvoiceAsPaid}
            />
          </div>
        )}

        {file && (
          <FileAttachmentChip fileName={file.name} filePath={file.path} />
        )}
      </div>

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
            messageThreadId={threadId}
            senderName={senderName}
            timestamp={sentAt}
          />

          <SendInboxThreadChatForm sendInboxThreadChat={sendThreadChat} />
        </Modal>
      )}
    </>
  );
}
