"use client";

import { buttonVariants } from "../Button/style.css";
import * as iconButtonStyles from "../IconButton/style.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import { can } from "../../data/users/permissions";
import { classnames } from "../../utils/classnames";
import { DropdownActions } from "../DropdownActions";
import { InternalLink } from "../Link/InternalLink";

type Link = [href: string, label: string];
type LinkWithPermissions = [href: string, label: string, permissions: string[]];

const links: Array<Link | LinkWithPermissions> = [
  ["/dashboard", "Dashboard"],
  ["/dashboard/files", "Files"],
  ["/dashboard/calendar", "Events"],
  ["/dashboard/membership", "Directory"],
  ["/dashboard/meetings", "Meetings", ["stratas.meetings.edit"]],
  ["/dashboard/inbox", "Strata Inbox"],
  ["/dashboard/settings", "Settings", ["stratas.strata.edit"]],
];

interface Props {
  actions?: React.ComponentProps<typeof DropdownActions>["actions"];
}

export function DashboardHeader({ actions }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className={styles.subheader}>
      <div className={styles.linksRail}>
        {links.map(([href, label, permissions = []]) => {
          const isActive =
            href === "/dashboard"
              ? pathname === href
              : pathname?.startsWith(href);

          if (permissions && !can(session?.user, ...permissions)) {
            return null;
          }

          return (
            <InternalLink
              key={href}
              className={
                isActive ? styles.activeSubheaderLink : styles.subheaderLink
              }
              href={href}
            >
              {label}
            </InternalLink>
          );
        })}
      </div>

      {actions && (
        <DropdownActions
          actions={actions}
          buttonClassName={classnames(
            iconButtonStyles.iconButton,
            iconButtonStyles.iconButtonSizes.small,
            buttonVariants.tertiary,
          )}
        />
      )}
    </div>
  );
}
