import * as styles from "./style.css";

import { InboxThreadChats } from "../../../../../components/InboxThreadChats";
import { getThread } from "../../../../../data/inbox/getThread";
import { listThreadChats } from "../../../../../data/inbox/listThreadChats";
import { InboxThreadChatsMobileButton } from "./InboxThreadChatsMobileButton";

interface Props {
  threadId: string;
}

export async function InboxThreadChatPanel({ threadId }: Props) {
  const [chats, thread] = await Promise.all([
    listThreadChats({ threadId }),
    getThread(threadId),
  ]);

  return (
    <>
      <div className={styles.chatPanelWrapper}>
        <div className={styles.chatPanelContents}>
          <InboxThreadChats chats={chats} threadId={threadId} />
        </div>
      </div>
      <InboxThreadChatsMobileButton chats={chats} thread={thread} />
    </>
  );
}
