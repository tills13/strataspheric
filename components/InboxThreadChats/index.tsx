import * as styles from "./style.css";

import { auth } from "../../auth";
import { getInboxThreadChats } from "../../db/inbox/getInboxThreadChats";
import { getInboxThreadMessages } from "../../db/inbox/getInboxThreadMessages";
import { classnames } from "../../utils/classnames";
import { SendInboxThreadChatForm } from "../SendInboxThreadChatForm";
import { ChatStream } from "./ChatStream";

interface Props {
  className?: string;
  sendInboxThreadChat: (fd: FormData) => void;
  threadId: string;
}

export async function InboxThreadChats({
  className,
  sendInboxThreadChat,
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
      <ChatStream chats={chats} subject={thread[0].subject} />

      <SendInboxThreadChatForm sendInboxThreadChat={sendInboxThreadChat} />
    </div>
  );
}
