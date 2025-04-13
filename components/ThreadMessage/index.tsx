"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { File, Invoice } from "../../data";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { useHash } from "../../hooks/useHash";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Date } from "../Date";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Group } from "../Group";
import { Header } from "../Header";
import { ChatIcon } from "../Icon/ChatIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";
import { Modal } from "../Modal";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { Stack } from "../Stack";
import { Text } from "../Text";

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

  return (
    <>
      <Stack
        id={id}
        className={classnames(
          hash === id ? styles.messageHighighted : styles.message,
          s({ p: "normal" }),
        )}
      >
        <Stack gap="0">
          <Group justify="space-between">
            <Group gap="small">
              <Header priority={3}>{senderName}</Header>
              <Text color="secondary">
                <Date timestamp={sentAt} />
              </Text>
            </Group>
            <div>
              {can(p("stratas", "inbox_thread_chats", "view")) && (
                <Button
                  icon={<ChatIcon />}
                  onClick={() => setShowChatReplyModal(true)}
                  size="small"
                  style="tertiary"
                />
              )}
            </div>
          </Group>
          <Text color="secondary">{senderEmail}</Text>
        </Stack>

        <Text className={classnames(styles.messageText)}>{message}</Text>

        <Stack>
          {invoice && (
            <InvoiceChip
              invoice={invoice}
              markInvoiceAsPaid={markInvoiceAsPaid}
            />
          )}

          {file && (
            <FileAttachmentChip fileName={file.name} filePath={file.path} />
          )}
        </Stack>
      </Stack>

      {showChatReplyModal && (
        <Modal
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
