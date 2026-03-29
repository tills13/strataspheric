import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Group } from "../../../../../components/Group";
import { InboxThreads } from "../../../../../components/InboxThreads";
import { Pagination } from "../../../../../components/Pagination";
import { SelectAllCheckbox } from "../../../../../components/SelectAllCheckbox";
import { TableSelectProvider } from "../../../../../components/Table/TableSelectProvider";
import { UnarchiveSelectedInboxMessagesButton } from "../../../../../components/UnarchiveSelectedInboxMessagesButton";
import { listThreads } from "../../../../../data/inbox/listThreads";
import { getCurrentStrataPlan } from "../../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";

export default async function Page({
  searchParams,
}: PageProps<"/dashboard/inbox/archived">) {
  const { page: rawPage } = await searchParams;
  const rawPageNum = typeof rawPage === "string" ? rawPage : undefined;
  const [session, strata, strataPlan] = await Promise.all([
    auth(),
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  if (strataPlan.enableInbox !== 1) {
    redirect("/dashboard");
  }

  if (!session || !session.user) {
    redirect("/dashboard/inbox");
  }

  const pageNum = parseInt(rawPageNum || "1", 10);
  const offset = (pageNum - 1) * 10;

  const { results: threads, total } = await listThreads(
    {
      archived: true,
      strataId: strata.id,
      userId: session.user.id,
      ...(!can(session.user, "stratas.inbox_messages.view") && {
        senderUserId: session.user.id,
      }),
    },
    { offset },
  );

  return (
    <TableSelectProvider>
      <DashboardLayout
        selectAll={
          <SelectAllCheckbox rowIds={threads.map((t) => t.threadId)} />
        }
        actions={
          <Group gap="small">
            <UnarchiveSelectedInboxMessagesButton />
          </Group>
        }
        title="Archived Messages"
      >
        <InboxThreads
          archived
          emptyMessage="There are no archived messages."
          threads={threads}
        />

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
