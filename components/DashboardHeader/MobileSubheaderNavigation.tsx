"use client";

import { NAVIGATION_SUB_LINKS } from "../../constants/navigation";
import { Permission, can, p } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
import { Breadcrumbs } from "../DashboardNavigation/Breadcrumbs";
import { BedIcon } from "../Icon/BedIcon";
import { CalendarIcon } from "../Icon/CalendarIcon";
import { DashboardIcon } from "../Icon/DashboardIcon";
import { FilesIcon } from "../Icon/FilesIcon";
import { GroupIcon } from "../Icon/GroupIcon";
import { InboxIcon } from "../Icon/InboxIcon";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { PersonIcon } from "../Icon/PersonIcon";
import { SettingsIcon } from "../Icon/SettingsIcon";
import {
  MobileSubheaderLink,
  MobileSubheaderNavigation as MobileSubheaderNavigationBase,
} from "../MobileSubheaderNavigation";

type LinkWithPermissions = MobileSubheaderLink & {
  permissions?: Permission[];
};

const links: LinkWithPermissions[] = [
  { icon: DashboardIcon, href: "/dashboard", label: "Dashboard", exact: true },
  {
    icon: FilesIcon,
    href: "/dashboard/files",
    label: "Files",
    permissions: [p("stratas", "files", "view")],
  },
  {
    icon: PaidDocumentIcon,
    href: "/dashboard/invoices",
    label: "Invoices",
    permissions: [p("stratas", "invoices", "view")],
  },
  {
    icon: CalendarIcon,
    href: "/dashboard/calendar",
    label: "Events",
    permissions: [p("stratas", "events", "view")],
  },
  { icon: PersonIcon, href: "/dashboard/membership", label: "Directory" },
  {
    icon: BedIcon,
    href: "/dashboard/amenities",
    label: "Amenities",
    permissions: [p("stratas", "amenities", "view")],
  },
  {
    icon: GroupIcon,
    href: "/dashboard/meetings",
    label: "Meetings",
    permissions: ["stratas.meetings.edit"],
  },
  { icon: InboxIcon, href: "/dashboard/inbox", label: "Strata Inbox" },
  {
    icon: PaidDocumentIcon,
    href: "/dashboard/subscription",
    label: "Subscription",
    permissions: ["stratas.settings.edit"],
  },
  {
    icon: SettingsIcon,
    href: "/dashboard/settings",
    label: "Settings",
    permissions: ["stratas.edit"],
  },
];

export function MobileSubheaderNavigation({
  badgeCounts,
  subPageTitle,
}: {
  badgeCounts?: Record<string, number>;
  subPageTitle?: string;
}) {
  const session = useSession();

  const filteredLinks = links.filter(
    ({ permissions }) => !permissions || can(session?.user, ...permissions),
  );

  return (
    <MobileSubheaderNavigationBase
      links={filteredLinks}
      subLinks={NAVIGATION_SUB_LINKS}
      badgeCounts={badgeCounts}
      breadcrumbs={
        subPageTitle ? <Breadcrumbs subPageTitle={subPageTitle} /> : undefined
      }
    />
  );
}
