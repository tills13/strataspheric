import { auth } from "../../auth";
import { countUnreadThreads } from "../../data/inbox/countUnreadThreads";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { can } from "../../data/users/permissions";
import { GlobalDashboardHeader } from "../DashboardNavigation";
import { MobileSubheaderNavigation } from "./MobileSubheaderNavigation";

export async function DashboardHeader(
  props: React.ComponentProps<typeof GlobalDashboardHeader>,
) {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const unreadCount = await countUnreadThreads({
    strataId: strata.id,
    ...(!can(session?.user, "stratas.inbox_messages.view") &&
      session?.user && {
        senderUserId: session.user.id,
      }),
  });

  const badgeCounts: Record<string, number> = {};
  if (unreadCount > 0) {
    badgeCounts["/dashboard/inbox"] = unreadCount;
  }

  return (
    <>
      <GlobalDashboardHeader {...props} />
      <MobileSubheaderNavigation {...props} badgeCounts={badgeCounts} />
    </>
  );
}
