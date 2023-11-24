import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../../auth";
import { DashboardHeader } from "../../../../../../components/DashboardHeader";
import { InboxMessageThread } from "../../../../../../components/InboxMessageThread";
import { InboxThreadChats } from "../../../../../../components/InboxThreadChats";
import { getThread } from "../../../../../../db/inbox/getThread";
import { Thread } from "../../../../../../db/inbox/getThreads";
import { getCurrentStrata } from "../../../../../../db/stratas/getStrata";
import { can, p } from "../../../../../../db/users/permissions";
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

  let thread: Thread;

  if (!session || !session.user) {
    if (!viewId) {
      redirect("/dashboard");
    }

    thread = await getThread(strata.id, threadId, {
      viewId,
    });
  } else {
    thread = await getThread(strata.id, threadId, {
      senderUserId: can(session.user, p("stratas", "inbox_messages", "view"))
        ? undefined
        : session.user.id,
    });
  }

  if (!thread) {
    redirect("/dashboard");
  }

  return (
    <>
      <DashboardHeader />
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
          sendInboxThreadChat={sendInboxThreadChatAction.bind(
            undefined,
            threadId,
            undefined,
          )}
          threadId={threadId}
        />
      </div>
    </>
  );
}
