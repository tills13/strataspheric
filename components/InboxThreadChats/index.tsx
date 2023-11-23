import * as styles from "./style.css";

import { auth } from "../../auth";
import { getInboxThreadChats } from "../../db/inbox/getInboxThreadChats";
import { getInboxThreadMessages } from "../../db/inbox/getInboxThreadMessages";
import { classnames } from "../../utils/classnames";
import { truncate } from "../../utils/truncate";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { QuoteIcon } from "../Icon/QuoteIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";

interface Props {
  className?: string;
  sendInboxThreadChatAction: (fd: FormData) => void;
  threadId: string;
}

export async function InboxThreadChats({
  className,
  sendInboxThreadChatAction,
  threadId,
}: Props) {
  const session = await auth();

  if (!session) {
    return (
      <div className={classnames(styles.chatsContainer, className)}>
        Sign in to view message chats
      </div>
    );
  }

  const thread = await getInboxThreadMessages(threadId);
  const chats = await getInboxThreadChats(threadId);

  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.chatsContainer, className)}>
        <Header className={styles.chatsHeader} priority={2}>
          Chat about &quot;{thread[0].subject}&quot;
        </Header>

        <div className={styles.chatStream}>
          {chats.length === 0 && (
            <p>
              No chats, yet. Start a conversation about this thread using the
              form below. Chats are private with authorized members of the
              council or individuals who are explicitly given the ability to see
              and engage with chats.
            </p>
          )}
          {chats.map((chat) => {
            return (
              <div
                key={chat.id}
                className={
                  chat.userId === session?.user?.id
                    ? styles.selfChatBubble
                    : styles.chatBubble
                }
              >
                <div className={styles.chatBubbleHeader}>
                  <Header priority={3}>{chat.name} said...</Header>
                  <span className={styles.chatBubbleTimestamp}>
                    {new Date(chat.sentAt).toDateString()}
                  </span>
                </div>

                {chat.quotedMessageMessage && chat.quotedMessageTimestamp && (
                  <div className={styles.quotedMessage}>
                    <div className={styles.chatBubbleHeader}>
                      <Header priority={3}>
                        <QuoteIcon className={styles.quotedMessageIcon} />{" "}
                        {chat.quotedMessageSender} sent...
                      </Header>
                      <span className={styles.quotedMessageTimestamp}>
                        {new Date(chat.quotedMessageTimestamp).toDateString()}
                      </span>
                    </div>

                    <p>{truncate(chat.quotedMessageMessage, 200)}</p>
                  </div>
                )}

                <p className={styles.chatMessage}>{chat.message}</p>

                {chat.filePath && (
                  <ExternalLink href={chat.filePath}>
                    <div className={styles.chatFile}>
                      <AttachmentIcon
                        className={styles.chatFileAttachmentIcon}
                      />
                      {chat.fileName}
                      {chat.fileDescription}
                    </div>
                  </ExternalLink>
                )}
              </div>
            );
          })}
        </div>

        <SendInboxThreadChatForm
          sendInboxThreadChatAction={sendInboxThreadChatAction}
        />
      </div>
    </div>
  );
}
