import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { InboxMessages } from "../../../../../components/InboxMessages";
import { getInboxMessages } from "../../../../../db/inbox/getInboxMessages";
// import { getStrataPlan } from "../../../../../db/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../../db/stratas/getStrata";
import { can } from "../../../../../db/users/permissions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  // const strataPlan = await getStrataPlan(strata.id);

  if (
    !can(session?.user, "stratas.inbox.view") ||
    false // strataPlan.enableInbox !== 1
  ) {
    redirect("/dashboard");
  }

  const messages = await getInboxMessages(strata.id);

  return (
    <div>
      <InboxMessages messages={messages} />
    </div>
  );
}
