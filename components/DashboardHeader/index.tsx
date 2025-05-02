"use client";

import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { Permission, can, p } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
import { Button } from "../Button";
import { Group } from "../Group";
import { BedIcon } from "../Icon/BedIcon";
import { CalendarIcon } from "../Icon/CalendarIcon";
import { DashboardIcon } from "../Icon/DashboardIcon";
import { DownIcon } from "../Icon/DownIcon";
import { FilesIcon } from "../Icon/FilesIcon";
import { GroupIcon } from "../Icon/GroupIcon";
import { InboxIcon } from "../Icon/InboxIcon";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { PersonIcon } from "../Icon/PersonIcon";
import { SettingsIcon } from "../Icon/SettingsIcon";
import { InternalLink } from "../Link/InternalLink";

type Link = [
  icon: React.ComponentType<{ classNameOverride?: string }>,
  href: string,
  label: string,
];
type LinkWithPermissions = [
  icon: React.ComponentType<{ classNameOverride?: string }>,
  href: string,
  label: string,
  permissions: Permission[],
];

const links: Array<Link | LinkWithPermissions> = [
  [DashboardIcon, "/dashboard", "Dashboard"],
  [FilesIcon, "/dashboard/files", "Files", [p("stratas", "files", "view")]],
  [
    PaidDocumentIcon,
    "/dashboard/invoices",
    "Invoices",
    [p("stratas", "invoices", "view")],
  ],
  [
    CalendarIcon,
    "/dashboard/calendar",
    "Events",
    [p("stratas", "events", "view")],
  ],
  [PersonIcon, "/dashboard/membership", "Directory"],
  [
    BedIcon,
    "/dashboard/amenities",
    "Amenities",
    [p("stratas", "amenities", "view")],
  ],
  [GroupIcon, "/dashboard/meetings", "Meetings", ["stratas.meetings.edit"]],
  [InboxIcon, "/dashboard/inbox", "Strata Inbox"],
  [SettingsIcon, "/dashboard/settings", "Settings", ["stratas.edit"]],
];

export function DashboardHeader() {
  const session = useSession();
  const pathname = usePathname();
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  const filteredMenuItems = links.filter(
    ([, , , permissions]) => !permissions || can(session?.user, ...permissions),
  );

  return (
    <div className={styles.subHeaderContainer}>
      <Group className={styles.subheader} align="start" justify="space-between">
        <div
          style={assignInlineVars({
            [styles.numHeaderItemsVar]: filteredMenuItems.length.toString(),
          })}
          className={
            mobileMenuExpanded ? styles.linksRailOpen : styles.linksRail
          }
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
                onClick={() => setMobileMenuExpanded(false)}
                href={href}
              >
                <IconComponent classNameOverride={styles.mobileMenuIcon} />

                <div className={styles.mobileMenuText}>{label}</div>
              </InternalLink>
            );
          })}
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
      </Group>
    </div>
  );
}
