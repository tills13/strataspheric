import { s } from "../../../../sprinkles.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { SendIcon } from "../../../../components/Icon/SendIcon";
import { InboxThreads } from "../../../../components/InboxThreads";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Thread, getThreads } from "../../../../data/inbox/getThreads";
import { getCurrentStrataPlan } from "../../../../data/strataPlans/getCurrentStrataPlan";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { InboxNoPlanPage } from "./InboxNoPlanPage";
import { deleteThreadAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const [session, strata, strataPlan] = await Promise.all([
    auth(),
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  console.log(strataPlan);

  if (strataPlan.enableInbox !== 1) {
    if (!can(session?.user, p("stratas", "inbox_messages", "view"))) {
      redirect("/dashboard");
    }

    return <InboxNoPlanPage />;
  }

  if (!session || !session.user) {
    redirect("/dashboard/inbox/send");
  }

  let threads: Thread[];

  if (can(session.user, p("stratas", "inbox_messages", "view"))) {
    threads = await getThreads(strata.id);
  } else {
    threads = await getThreads(strata.id, session.user.id);
  }

  return (
    <>
      <DashboardHeader />

      <div>
        <div className={s({ p: "normal" })}>
          <Group justify="space-between">
            <Header priority={2}>Inbox</Header>

            <InternalLink href="/dashboard/inbox/send" noUnderline>
              <Button
                color="primary"
                iconRight={<SendIcon />}
                iconTextBehaviour="centerRemainder"
                style="secondary"
              >
                New Message to Strata
              </Button>
            </InternalLink>
          </Group>
        </div>

        <InboxThreads deleteThread={deleteThreadAction} threads={threads} />
      </div>
    </>
  );
}
