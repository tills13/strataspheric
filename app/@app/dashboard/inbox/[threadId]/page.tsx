import "../../../../scrollAnimationCssProperty.css";
import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Thread, getThread } from "../../../../../data/inbox/getThread";
import { markThreadRead } from "../../../../../data/inbox/markThreadRead";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { InboxMessageThread } from "./InboxMessageThread";
import { InboxThreadChatPanel } from "./InboxThreadChatPanel";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/dashboard/inbox/[threadId]">) {
  const session = await auth();

  const { threadId } = await params;
  const { viewId: rawViewId } = await searchParams;
  const viewId = typeof rawViewId === "string" ? rawViewId : undefined;

  let thread: Thread;

  if (!session || !session.user) {
    if (!viewId) {
      redirect("/dashboard");
    }

    thread = await getThread(threadId, { viewId });
  } else {
    thread = await getThread(threadId, {
      userId: session.user.id,
      senderUserId: can(session.user, "stratas.inbox_messages.view")
        ? undefined
        : session.user.id,
    });
  }

  if (!thread) {
    redirect("/dashboard");
  }

  if (session?.user && thread.isUnread) {
    await markThreadRead(session.user.id, threadId);
  }

  const canSeeChats = can(
    session?.user,
    p("stratas", "inbox_thread_chats", "view"),
  );

  return (
    <DashboardLayout subPageTitle={thread.subject} noPadding>
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
