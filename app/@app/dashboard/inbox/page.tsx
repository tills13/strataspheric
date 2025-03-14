import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Header } from "../../../../components/Header";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { InboxThreads } from "../../../../components/InboxThreads";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Thread, getThreads } from "../../../../data/inbox/getThreads";
import { getStrataPlan } from "../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { deleteThreadAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const strataPlan = await getStrataPlan(strata.id);

  if (strataPlan.enableInbox !== 1) {
    if (
      !session ||
      !session.user ||
      !can(session.user, p("stratas", "inbox_messages", "view"))
    ) {
      redirect("/dashboard");
    }

    return (
      <>
        <DashboardHeader />
        <div className={styles.upsellContainer}>
          <Header priority={2} className={s({ mb: "large" })}>
            Oops...
          </Header>

          <p className={s({ mb: "normal" })}>
            The strata inbox is only available on select plans.
          </p>

          <p className={s({ mb: "large" })}>
            The inbox streamlines conversations with council, automatically
            keeping a history of all correspondance. Stop worrying about shared
            email accounts or private emails being used to store official strata
            communication.
          </p>

          <InternalLink href={"/dashboard/settings#plan"}>
            <Button fullWidth color="primary">
              Upgrade your plan today
            </Button>
          </InternalLink>
        </div>
      </>
    );
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
        <InboxThreads deleteThread={deleteThreadAction} threads={threads} />

        <div className={styles.newMessageContainer}>
          <InternalLink href="/dashboard/inbox/send">
            <Button color="primary" iconRight={<AddIcon />} fullWidth>
              New Message to Strata
            </Button>
          </InternalLink>
        </div>
      </div>
    </>
  );
}
