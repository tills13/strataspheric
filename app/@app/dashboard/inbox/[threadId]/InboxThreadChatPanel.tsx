import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { InboxThreadChats } from "../../../../../components/InboxThreadChats";
import { getThreadChats } from "../../../../../data/inbox/getThreadChats";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { upsertFileAction } from "../../files/actions";
import { sendInboxThreadChatAction } from "./actions";

export default async function InboxThreadChatPanel({
  threadId,
}: {
  threadId: string;
}) {
  const session = await auth();

  if (!session) {
    return (
      <div className={styles.chatPanelWrapper}>
        Sign in to view message chats
      </div>
    );
  } else if (!can(session.user, p("stratas", "inbox_thread_chats", "view"))) {
    return (
      <div
        className={classnames(
          styles.chatPanelWrapper,
          s({ padding: "normal" }),
        )}
      >
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
        upsertFile={upsertFileAction.bind(undefined, undefined)}
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
