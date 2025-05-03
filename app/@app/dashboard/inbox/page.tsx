import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { PageProps } from "../../../../.next/types/app/@app/dashboard/inbox/page";
import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { Checkbox } from "../../../../components/Checkbox";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { SendIcon } from "../../../../components/Icon/SendIcon";
import { InboxThreads } from "../../../../components/InboxThreads";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Pagination } from "../../../../components/Pagination";
import { listThreads } from "../../../../data/inbox/listThreads";
import { getCurrentStrataPlan } from "../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { InboxNoPlanPage } from "./InboxNoPlanPage";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
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

    return <InboxNoPlanPage />;
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

  console.log(total);

  return (
    <div>
      <div className={s({ p: "normal" })}>
        <Group justify="space-between">
          <Group className={styles.inboxPageHeader}>
            <Checkbox />
            <Header as="h2">Inbox</Header>
          </Group>

          <InternalLink href="/dashboard/inbox/send" noUnderline>
            <Button
              color="primary"
              iconRight={<SendIcon />}
              iconTextBehaviour="centerRemainder"
              style="secondary"
            >
              Send Message
            </Button>
          </InternalLink>
        </Group>
      </div>

      <InboxThreads threads={threads} />

      <Group p="normal" justify="end">
        <Pagination currentPage={pageNum} totalPages={Math.ceil(total / 10)} />
      </Group>
    </div>
  );
}
