import * as styles from "./style.css";

import React, { Suspense } from "react";

import { auth } from "../../auth";
import { NAVIGATION_LINKS } from "../../constants/navigation";
import { countUnreadThreads } from "../../data/inbox/countUnreadThreads";
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
          >
            {label}
          </SidebarNavigationItem>
        ))}
      </Stack>
    </div>
  );
}
