"use client";

import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { can } from "../../data/users/permissions";
import { Button } from "../Button";
import { DropdownActions } from "../DropdownActions";
import { BedIcon } from "../Icon/BedIcon";
import { CalendarIcon } from "../Icon/CalendarIcon";
import { DashboardIcon } from "../Icon/DashboardIcon";
import { DownIcon } from "../Icon/DownIcon";
import { FilesIcon } from "../Icon/FilesIcon";
import { GroupIcon } from "../Icon/GroupIcon";
import { InboxIcon } from "../Icon/InboxIcon";
import { PersonIcon } from "../Icon/PersonIcon";
import { SettingsIcon } from "../Icon/SettingsIcon";
import { ZipFileIcon } from "../Icon/ZipFileIcon";
import { InternalLink } from "../Link/InternalLink";

type Link = [
  icon: React.ComponentType<{ className?: string }>,
  href: string,
  label: string,
];
type LinkWithPermissions = [
  icon: React.ComponentType<{ className?: string }>,
  href: string,
  label: string,
  permissions: string[],
];

const links: Array<Link | LinkWithPermissions> = [
  [DashboardIcon, "/dashboard", "Dashboard"],
  [FilesIcon, "/dashboard/files", "Files"],
  [CalendarIcon, "/dashboard/calendar", "Events"],
  [PersonIcon, "/dashboard/membership", "Directory"],
  [BedIcon, "/dashboard/amenities", "Amenities"],
  [GroupIcon, "/dashboard/meetings", "Meetings", ["stratas.meetings.edit"]],
  [InboxIcon, "/dashboard/inbox", "Strata Inbox"],
  [SettingsIcon, "/dashboard/settings", "Settings", ["stratas.strata.edit"]],
];

interface Props {
  actions?: React.ComponentProps<typeof DropdownActions>["actions"];
}

export function DashboardHeader({ actions }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  const filteredMenuItems = links.filter(
    ([, , , permissions]) => !permissions || can(session?.user, ...permissions),
  );

  return (
    <div className={styles.subheader}>
      <div
        style={assignInlineVars({
          [styles.numHeaderItemsVar]: filteredMenuItems.length.toString(),
        })}
        className={mobileMenuExpanded ? styles.linksRailOpen : styles.linksRail}
      >
        {filteredMenuItems.map(([IconComponent, href, label]) => {
          const isActive =
            href === "/dashboard"
              ? pathname === href
              : pathname?.startsWith(href);

          return (
            <InternalLink
              key={href}
              className={
                isActive ? styles.activeSubheaderLink : styles.subheaderLink
              }
              href={href}
            >
              <IconComponent className={styles.mobileMenuIcon} />
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
      </div>
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
  );
}
