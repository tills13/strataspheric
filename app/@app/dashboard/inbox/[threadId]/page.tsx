import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { PageProps } from "../../../../../.next/types/app/@app/dashboard/inbox/page";
import { auth } from "../../../../../auth";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { getThread } from "../../../../../data/inbox/getThread";
import { Thread } from "../../../../../data/inbox/getThreads";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { createInboxMessageAction } from "../actions";
import { InboxMessageThread } from "./InboxMessageThread";
import InboxThreadChatPanel from "./InboxThreadChatPanel";
import { sendInboxThreadChatAction } from "./actions";

export const runtime = "edge";

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();
  const strata = await mustGetCurrentStrata();
  const { threadId } = await params;
  const { viewId } = await searchParams;

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

  const canSeeChats = can(
    session?.user,
    p("stratas", "inbox_thread_chats", "view"),
  );

  return (
    <>
      <DashboardHeader />
      <div
        className={classnames(
          canSeeChats && styles.threadPageContainerWithChats,
        )}
      >
        <InboxMessageThread
          sendInboxThreadChatAction={sendInboxThreadChatAction.bind(
            undefined,
            threadId,
          )}
          sendNewMessageAction={createInboxMessageAction.bind(
            undefined,
            threadId,
          )}
          threadId={threadId}
        />
        {canSeeChats && <InboxThreadChatPanel threadId={threadId} />}
      </div>
    </>
  );
}
