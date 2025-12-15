import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import ArchiveSelectedInboxMessagesButton from "../../../../components/ArchiveSelectedInboxMessagesButton";
import { Button } from "../../../../components/Button";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { Group } from "../../../../components/Group";
import { SendIcon } from "../../../../components/Icon/SendIcon";
import { InboxThreads } from "../../../../components/InboxThreads";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Pagination } from "../../../../components/Pagination";
import { TableSelectProvider } from "../../../../components/Table/TableSelectProvider";
import { Upsell } from "../../../../components/Upsell";
import { listThreads } from "../../../../data/inbox/listThreads";
import { getCurrentStrataPlan } from "../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";


const INBOX_UPSELL = `
 Stop worrying about shared email accounts or private emails being used
to store official strata communication. The strata inbox streamlines
conversations with council, automatically keeping a history of all
correspondance forever.
`.trim();

export default async function Page({ searchParams }: PageProps<"/dashboard/inbox">) {
  const { page: rawPageNum } = await searchParams;
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
      <Upsell
        upsellDescription={INBOX_UPSELL}
        upsellFeature="The strata inbox"
      />
    );
  }

  if (!session || !session.user) {
    redirect("/dashboard/inbox/send");
  }

  const pageNum = parseInt(rawPageNum || "1", 10);
  const offset = (pageNum - 1) * 10;

  const { results: threads, total } = await listThreads(
    {
      strataId: strata.id,
      ...(!can(session.user, "stratas.inbox_messages.view") && {
        senderUserId: session.user.id,
      }),
    },
    { offset },
  );

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
          </Group>
        }
        title={`Inbox (${threads.length})`}
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
