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

  const unreadCount = session?.user
    ? await countUnreadThreads({
        strataId: strata.id,
        userId: session.user.id,
        ...(!can(session.user, "stratas.inbox_messages.view") && {
          senderUserId: session.user.id,
        }),
      })
    : 0;

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
