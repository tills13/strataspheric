import { message } from "../../../../../../components/InboxMessageThread/style.css";
import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../../auth";
import { InboxMessageThread } from "../../../../../../components/InboxMessageThread";
import { InboxThreadChats } from "../../../../../../components/InboxThreadChats";
import { getInboxThreadMessages } from "../../../../../../db/inbox/getInboxThreadMessages";
import { getCurrentStrata } from "../../../../../../db/stratas/getStrata";
import { can } from "../../../../../../db/users/permissions";
import { sendInboxMessageAction } from "../actions";
import { sendInboxThreadChatAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  params: { threadId },
  searchParams: { viewId },
}) {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const messages = await getInboxThreadMessages(threadId, viewId);

  if (viewId) {
    if (!messages) {
      redirect("/dashboard");
    }
  } else if (!can(session?.user, "stratas.inbox.view")) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.threadPageContainer}>
      <InboxMessageThread
        sendInboxThreadChatAction={sendInboxThreadChatAction.bind(
          undefined,
          threadId,
        )}
        sendNewMessageAction={sendInboxMessageAction.bind(
          undefined,
          strata.id,
          threadId,
        )}
        threadId={threadId}
      />
      <InboxThreadChats
        sendInboxThreadChatAction={sendInboxThreadChatAction.bind(
          undefined,
          threadId,
        )}
        threadId={threadId}
      />
    </div>
  );
}
