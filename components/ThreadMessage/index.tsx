"use client";

import * as styles from "./style.css";

import { useState, useTransition } from "react";

import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { useHash } from "../../hooks/useHash";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Date } from "../Date";
import { FileLink } from "../FileLink";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { ChatIcon } from "../Icon/ChatIcon";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { Modal } from "../Modal";
import { Money } from "../Money";
import { Panel } from "../Panel";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { StatusButton } from "../StatusButton";

interface Props {
  id: string;
  filePath?: string | null;
  fileName?: string | null;
  invoiceId?: string | null;
  invoiceIdentifier?: string | null;
  invoiceAmount?: string | null;
  invoiceDescription?: string | null;
  invoiceDueBy?: number | null;
  invoiceIsPaid?: 0 | 1;
  markInvoiceAsPaid: (invoiceId: string) => void;
  message: string;
  senderName: string;
  senderEmail: string;
  sentAt: number;
  sendThreadChat: (fd: FormData) => void;
}

export function ThreadMessage({
  id,
  message,
  fileName,
  filePath,
  invoiceId,
  invoiceIdentifier,
  invoiceAmount,
  invoiceDescription,
  invoiceDueBy,
  invoiceIsPaid,
  markInvoiceAsPaid,
  senderEmail,
  senderName,
  sentAt,
  sendThreadChat,
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

        {invoiceId && (
          <div className={styles.messageInvoice}>
            <Panel>
              <div className={styles.invoiceHeader}>
                <Header priority={3}>Invoice #{invoiceIdentifier}</Header>
                <div className={styles.invoiceHeaderStatus}>
                  {invoiceIsPaid === 1 ? (
                    <>
                      Paid{" "}
                      <CircleCheckIcon className={styles.invoiceStatusIcon} />
                    </>
                  ) : (
                    <>
                      Pending{" "}
                      <StatusButton
                        color="success"
                        iconRight={<CircleCheckIcon />}
                        iconTextBehaviour="centerRemainder"
                        onClick={() =>
                          startTransition(async () => {
                            await markInvoiceAsPaid(invoiceId);
                          })
                        }
                        size="small"
                        fullWidth={false}
                        isPending={markIsPaidIsPending}
                      >
                        Mark Paid
                      </StatusButton>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.invoiceBody}>
                <p className={styles.invoiceDescription}>
                  {invoiceDescription || "Pay in the amount of"}
                </p>
                <div className={styles.invoiceAmountContainer}>
                  <Money amount={invoiceAmount} />
                </div>
              </div>
            </Panel>
          </div>
        )}

        {filePath && (
          <FileLink path={filePath}>
            <div className={styles.messageFile}>
              <AttachmentIcon className={styles.messageFileAttachmentIcon} />
              {fileName}
            </div>
          </FileLink>
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
            senderName={senderName}
            timestamp={sentAt}
          />

          <SendInboxThreadChatForm sendInboxThreadChat={sendThreadChat} />
        </Modal>
      )}
    </>
  );
}
