import * as styles from "./style.css";

import { auth } from "../../auth";
import { getThreadChats } from "../../data/inbox/getThreadChats";
import { getThreadMessages } from "../../data/inbox/getThreadMessages";
import { can, p } from "../../data/users/permissions";
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
      <div className={classnames(styles.wrapper, className)}>
        Sign in to view message chats
      </div>
    );
  } else if (!can(session.user, p("stratas", "inbox_thread_chats", "view"))) {
    return (
      <div className={classnames(styles.wrapper, className)}>
        You don&apos;t have permission to see chats
      </div>
    );
  }

  const thread = await getThreadMessages(threadId);
  const chats = await getThreadChats(threadId);

  return (
    <div className={styles.wrapper}>
      <ChatStream
        chats={chats}
        currentUser={session.user}
        subject={thread[0].subject}
      />

      <SendInboxThreadChatForm sendInboxThreadChat={sendInboxThreadChat} />
    </div>
  );
}
