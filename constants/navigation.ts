import React from "react";

import { ApartmentIcon } from "../components/Icon/ApartmentIcon";
import { ArchiveIcon } from "../components/Icon/ArchiveIcon";
import { HistoryIcon } from "../components/Icon/HistoryIcon";
import { BedIcon } from "../components/Icon/BedIcon";
import { CalendarIcon } from "../components/Icon/CalendarIcon";
import { CycleIcon } from "../components/Icon/CycleIcon";
import { DashboardIcon } from "../components/Icon/DashboardIcon";
import { FilesIcon } from "../components/Icon/FilesIcon";
import { GroupIcon } from "../components/Icon/GroupIcon";
import { Icon } from "../components/Icon/Icon";
import { InboxIcon } from "../components/Icon/InboxIcon";
import { PaidDocumentIcon } from "../components/Icon/PaidDocumentIcon";
import { PersonIcon } from "../components/Icon/PersonIcon";
import { SettingsIcon } from "../components/Icon/SettingsIcon";
import { Permission } from "../data/users/permissions";

export interface SubLink {
  href: string;
  label: string;
  icon: React.ComponentType<React.ComponentProps<typeof Icon>>;
}

type Link = [href: string, label: string];

type LinkWithPermissions = [
  href: string,
  label: string,
  permissions: Permission[],
];

export const NAVIGATION_LINKS: Array<Link | LinkWithPermissions> = [
  ["/dashboard", "Dashboard"],
  ["/dashboard/files", "Files", ["stratas.files.view"]],
  ["/dashboard/invoices", "Invoices", ["stratas.invoices.view"]],
  ["/dashboard/calendar", "Events", ["stratas.events.view"]],
  ["/dashboard/membership", "Directory"],
  ["/dashboard/amenities", "Amenities", ["stratas.amenities.view"]],
  ["/dashboard/meetings", "Meetings", ["stratas.meetings.edit"]],
  ["/dashboard/inbox", "Strata Inbox"],
  ["/dashboard/subscription", "Subscription", ["stratas.settings.edit"]],
  ["/dashboard/settings", "Settings", ["stratas.settings.view"]],
];

export const NAVIGATION_LINK_ICONS: Record<
  string,
  React.ComponentType<React.ComponentProps<typeof Icon>>
> = {
  "/dashboard": DashboardIcon,
  "/dashboard/files": FilesIcon,
  "/dashboard/invoices": PaidDocumentIcon,
  "/dashboard/calendar": CalendarIcon,
  "/dashboard/membership": PersonIcon,
  "/dashboard/amenities": BedIcon,
  "/dashboard/meetings": GroupIcon,
  "/dashboard/inbox": InboxIcon,
  "/dashboard/subscription": PaidDocumentIcon,
  "/dashboard/settings": SettingsIcon,
};

export const NAVIGATION_SUB_LINKS: Record<string, SubLink[]> = {
  "/dashboard/inbox": [
    { href: "/dashboard/inbox/archived", label: "Archived", icon: ArchiveIcon },
  ],
  "/dashboard/invoices": [
    {
      href: "/dashboard/invoices/archived",
      label: "Archived",
      icon: ArchiveIcon,
    },
  ],
  "/dashboard/meetings": [
    {
      href: "/dashboard/meetings/past",
      label: "Past",
      icon: HistoryIcon,
    },
  ],
  "/dashboard/membership": [
    {
      href: "/dashboard/membership/units",
      label: "Units",
      icon: ApartmentIcon,
    },
    {
      href: "/dashboard/membership/pending",
      label: "Pending",
      icon: CycleIcon,
    },
  ],
};
