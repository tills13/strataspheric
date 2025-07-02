import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { PageProps } from "../../../../../.next/types/app/@app/dashboard/inbox/[threadId]/page";
import { auth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Thread, getThread } from "../../../../../data/inbox/getThread";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { InboxMessageThread } from "./InboxMessageThread";
import { InboxThreadChatPanel } from "./InboxThreadChatPanel";

export const runtime = "edge";

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();

  const { threadId } = await params;
  const { viewId } = await searchParams;

  let thread: Thread;

  if (!session || !session.user) {
    if (!viewId) {
      redirect("/dashboard");
    }

    thread = await getThread(threadId, { viewId });
  } else {
    thread = await getThread(threadId, {
      senderUserId: can(session.user, "stratas.inbox_messages.view")
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
    <DashboardLayout subPageTitle={thread.subject}>
      <div
        className={classnames(
          canSeeChats && styles.threadPageContainerWithChats,
        )}
      >
        <InboxMessageThread threadId={threadId} />
        {canSeeChats && <InboxThreadChatPanel threadId={threadId} />}
      </div>
    </DashboardLayout>
  );
}
