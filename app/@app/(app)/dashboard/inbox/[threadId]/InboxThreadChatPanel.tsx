import * as styles from "./style.css";

import { auth } from "../../../../../../auth";
import { InboxThreadChats } from "../../../../../../components/InboxThreadChats";
import { InboxThreadChat } from "../../../../../../components/InboxThreadChats/InboxThreadChat";
import { getThreadChats } from "../../../../../../data/inbox/getThreadChats";
import { getThreadMessages } from "../../../../../../data/inbox/getThreadMessages";
import { can, p } from "../../../../../../data/users/permissions";
import { classnames } from "../../../../../../utils/classnames";
import { sendInboxThreadChatAction } from "./actions";

export default async function InboxThreadChatPanel({ threadId }) {
  const session = await auth();

  if (!session) {
    return (
      <div className={styles.chatPanelWrapper}>
        Sign in to view message chats
      </div>
    );
  } else if (!can(session.user, p("stratas", "inbox_thread_chats", "view"))) {
    return (
      <div className={styles.chatPanelWrapper}>
        You don&apos;t have permission to see chats
      </div>
    );
  }

  const thread = await getThreadMessages(threadId);
  const chats = await getThreadChats(threadId);

  return (
    <div className={styles.chatPanelWrapper}>
      <InboxThreadChats
        chats={chats}
        sendInboxThreadChat={sendInboxThreadChatAction.bind(
          undefined,
          threadId,
          undefined,
        )}
        thread={thread}
      />
    </div>
  );
}
