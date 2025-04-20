import { s } from "../../../../sprinkles.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { SendIcon } from "../../../../components/Icon/SendIcon";
import { InboxThreads } from "../../../../components/InboxThreads";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { listThreads } from "../../../../data/inbox/listThreads";
import { getCurrentStrataPlan } from "../../../../data/strataPlans/getCurrentStrataPlan";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { InboxNoPlanPage } from "./InboxNoPlanPage";
import { deleteThreadAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
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

  const threads = await listThreads({
    strataId: strata.id,
    ...(!can(session.user, "stratas.inbox_messages.view") && {
      senderUserId: session.user.id,
    }),
  });

  return (
    <div>
      <div className={s({ p: "normal" })}>
        <Group justify="space-between">
          <Header as="h2">Inbox</Header>

          <InternalLink href="/dashboard/inbox/send" noUnderline>
            <Button
              color="primary"
              iconRight={<SendIcon />}
              iconTextBehaviour="centerRemainder"
              style="secondary"
            >
              New Message to {strata.name}
            </Button>
          </InternalLink>
        </Group>
      </div>

      <InboxThreads deleteThread={deleteThreadAction} threads={threads} />
    </div>
  );
}
