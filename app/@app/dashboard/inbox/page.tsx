import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import ArchiveSelectedInboxMessagesButton from "../../../../components/ArchiveSelectedInboxMessagesButton";
import { Button } from "../../../../components/Button";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { Group } from "../../../../components/Group";
import { GroupIcon } from "../../../../components/Icon/GroupIcon";
import { SendIcon } from "../../../../components/Icon/SendIcon";
import { InboxThreads } from "../../../../components/InboxThreads";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Pagination } from "../../../../components/Pagination";
import { SelectAllCheckbox } from "../../../../components/SelectAllCheckbox";
import { TableSelectProvider } from "../../../../components/Table/TableSelectProvider";
import { Upsell } from "../../../../components/Upsell";
import { countUnreadThreads } from "../../../../data/inbox/countUnreadThreads";
import { listThreads } from "../../../../data/inbox/listThreads";
import { getCurrentStrataPlan } from "../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";

const INBOX_UPSELL =
  "One place for all strata communication. No more scattered emails or lost threads — every conversation is tracked and searchable.";

export default async function Page({
  searchParams,
}: PageProps<"/dashboard/inbox">) {
  const { page: rawPage } = await searchParams;
  const rawPageNum = typeof rawPage === "string" ? rawPage : undefined;
  const [session, strata, strataPlan] = await Promise.all([
    auth(),
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  if (strataPlan.enableInbox !== 1) {
    if (!can(session?.user, "stratas.inbox_messages.view")) {
      redirect("/dashboard");
    }

    return (
      <DashboardLayout title="Strata Inbox">
        <Upsell
          upsellDescription={INBOX_UPSELL}
          upsellFeature="The strata inbox"
        />
      </DashboardLayout>
    );
  }

  if (!session || !session.user) {
    redirect("/dashboard/inbox/send");
  }

  const pageNum = parseInt(rawPageNum || "1", 10);
  const offset = (pageNum - 1) * 10;

  const threadFilter = {
    strataId: strata.id,
    ...(!can(session.user, "stratas.inbox_messages.view") && {
      senderUserId: session.user.id,
    }),
  };

  const [{ results: threads, total }, unreadCount] = await Promise.all([
    listThreads({ ...threadFilter, userId: session.user.id }, { offset }),
    countUnreadThreads({ ...threadFilter, userId: session.user.id }),
  ]);

  const title =
    unreadCount > 0 ? `Strata Inbox (${unreadCount} unread)` : "Strata Inbox";

  return (
    <TableSelectProvider>
      <DashboardLayout
        actions={
          <Group gap="small">
            <ArchiveSelectedInboxMessagesButton />

            <InternalLink href="/dashboard/inbox/send" noUnderline>
              <Button
                color="primary"
                style="tertiary"
                size="small"
                icon={<SendIcon />}
              />
            </InternalLink>
            {can(session?.user, "stratas.inbox_blasts.create") && (
              <InternalLink href="/dashboard/inbox/blast" noUnderline>
                <Button
                  color="primary"
                  style="tertiary"
                  size="small"
                  icon={<GroupIcon />}
                />
              </InternalLink>
            )}
          </Group>
        }
        selectAll={
          <SelectAllCheckbox rowIds={threads.map((t) => t.threadId)} />
        }
        title={title}
      >
        <InboxThreads threads={threads} />

        <Group p="normal" justify="end">
          <Pagination
            currentPage={pageNum}
            totalPages={Math.ceil(total / 10)}
          />
        </Group>
      </DashboardLayout>
    </TableSelectProvider>
  );
}
