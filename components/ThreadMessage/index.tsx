"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { InboxThreadMessage } from "../../data/inbox/getThreadMessages";
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
  inboxThreadMessage: InboxThreadMessage;
  showSenderDetails?: boolean;
}

export function ThreadMessage({
  id,
  inboxThreadMessage,
  showSenderDetails = true,
}: Props) {
  const { file, invoice, message, senderEmail, senderName, sentAt, threadId } =
    inboxThreadMessage;
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
        <Group justify="space-between">
          {showSenderDetails ? (
            <Stack gap="xs">
              <Group gap="small">
                <Header as="h3">{senderName}</Header>
                <Text color="secondary">
                  <Date timestamp={sentAt} />
                </Text>
              </Group>
              <Text color="secondary">{senderEmail}</Text>
            </Stack>
          ) : (
            <div />
          )}
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

        <Text className={classnames(styles.messageText)}>{message}</Text>

        <Stack>
          {invoice && <InvoiceChip invoice={invoice} />}

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
            source={{ id, message, senderName, sentAt, threadId }}
          />

          <SendInboxThreadChatForm threadId={threadId} />
        </Modal>
      )}
    </>
  );
}
