import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { ElementGroup } from "../../../../../components/ElementGroup";
import { Header } from "../../../../../components/Header";
import { InboxThreads } from "../../../../../components/InboxThreads";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { Thread, getThreads } from "../../../../../db/inbox/getThreads";
import { getStrataPlan } from "../../../../../db/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../../db/stratas/getStrata";
import { can, p } from "../../../../../db/users/permissions";
import { deleteThreadAction } from "./actions";

const baseUrl =
  process.env.NODE_ENV === "development" ? "" : "https://strataspheric.app";

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
          <ElementGroup className={styles.upsell} orientation="column">
            <Header priority={2}>Oops...</Header>

            <p>The strata inbox is only available on select plans.</p>

            <p>
              The inbox streamlines conversations with council, automatically
              keeping a history of all correspondance. Stop worrying about
              shared email accounts or private emails being used to store
              official strata communication.
            </p>

            <InternalLink href={"/dashboard/settings#plan"}>
              <Button
                className={styles.upsellButton}
                variant="primary"
                size="large"
              >
                Upgrade your plan today
              </Button>
            </InternalLink>
          </ElementGroup>
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
      <InboxThreads deleteThread={deleteThreadAction} threads={threads} />
    </>
  );
}
