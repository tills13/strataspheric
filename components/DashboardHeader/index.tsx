"use client";

import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { can } from "../../data/users/permissions";
import { Button } from "../Button";
import { DropdownActions } from "../DropdownActions";
import { DownIcon } from "../Icon/DownIcon";
import { InternalLink } from "../Link/InternalLink";

type Link = [href: string, label: string];
type LinkWithPermissions = [href: string, label: string, permissions: string[]];

const links: Array<Link | LinkWithPermissions> = [
  ["/dashboard", "Dashboard"],
  ["/dashboard/files", "Files"],
  ["/dashboard/calendar", "Events"],
  ["/dashboard/membership", "Directory"],
  ["/dashboard/amenities", "Amenities"],
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
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  return (
    <div className={styles.subheader}>
      <div
        style={assignInlineVars({
          [styles.numHeaderItemsVar]: links.length.toString(),
        })}
        className={mobileMenuExpanded ? styles.linksRailOpen : styles.linksRail}
      >
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

      <div className={styles.actionsContainer}>
        {actions && (
          <DropdownActions
            actions={actions}
            buttonSize="small"
            buttonStyle="tertiary"
          />
        )}
        <Button
          className={styles.mobileDropdownAction}
          onClick={() => setMobileMenuExpanded(!mobileMenuExpanded)}
          icon={
            <DownIcon
              className={
                mobileMenuExpanded
                  ? styles.toggleMobileDropdownIconActive
                  : styles.toggleMobileDropdownIcon
              }
            />
          }
          size="small"
          style="tertiary"
        />
      </div>
    </div>
  );
}
