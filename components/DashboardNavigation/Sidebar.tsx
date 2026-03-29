import * as styles from "./style.css";

import React, { Suspense } from "react";

import { auth } from "../../auth";
import { NAVIGATION_LINKS } from "../../constants/navigation";
import { countUnreadThreads } from "../../data/inbox/countUnreadThreads";
import { countPendingMemberships } from "../../data/memberships/countPendingMemberships";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { can } from "../../data/users/permissions";
import { classnames } from "../../utils/classnames";
import { Stack } from "../Stack";
import { ServerUserStrataSelectorButton } from "./ServerUserStrataSelectorButton";
import { SidebarNavigationItem } from "./SidebarNavigationItem";
import { UserStrataSelectorButton } from "./UserStrataSelectorButton";

export async function Sidebar() {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  const filteredMenuItems = NAVIGATION_LINKS.filter(
    ([, , permissions]) => !permissions || can(session?.user, ...permissions),
  );

  const canEditMemberships = can(session?.user, "stratas.memberships.edit");

  const [unreadCount, pendingCount] = await Promise.all([
    session?.user
      ? countUnreadThreads({
          strataId: strata.id,
          userId: session.user.id,
          ...(!can(session.user, "stratas.inbox_messages.view") && {
            senderUserId: session.user.id,
          }),
        })
      : 0,
    canEditMemberships ? countPendingMemberships(strata.id) : 0,
  ]);

  const badgeCounts: Record<string, number> = {};
  if (unreadCount > 0) {
    badgeCounts["/dashboard/inbox"] = unreadCount;
  }
  if (pendingCount > 0) {
    badgeCounts["/dashboard/membership/pending"] = pendingCount;
  }

  return (
    <div className={classnames(styles.sidebar)}>
      <Suspense
        fallback={
          <UserStrataSelectorButton
            currentStrata={strata}
            sessionStratas={[]}
          />
        }
      >
        <ServerUserStrataSelectorButton currentStrata={strata} />
      </Suspense>
      <Stack gap="xs" p="small">
        {filteredMenuItems.map(([href, label]) => (
          <SidebarNavigationItem
            key={href}
            href={href}
            badge={badgeCounts[href]}
            badgeCounts={badgeCounts}
          >
            {label}
          </SidebarNavigationItem>
        ))}
      </Stack>
    </div>
  );
}
