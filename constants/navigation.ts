import React from "react";

import { BedIcon } from "../components/Icon/BedIcon";
import { CalendarIcon } from "../components/Icon/CalendarIcon";
import { DashboardIcon } from "../components/Icon/DashboardIcon";
import { FilesIcon } from "../components/Icon/FilesIcon";
import { GroupIcon } from "../components/Icon/GroupIcon";
import { Icon } from "../components/Icon/Icon";
import { InboxIcon } from "../components/Icon/InboxIcon";
import { PaidDocumentIcon } from "../components/Icon/PaidDocumentIcon";
import { PersonIcon } from "../components/Icon/PersonIcon";
import { SettingsIcon } from "../components/Icon/SettingsIcon";
import { Permission } from "../data/users/permissions";

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
  ["/dashboard/settings", "Settings", ["stratas.edit"]],
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
  "/dashboard/settings": SettingsIcon,
};
