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

type Link = [
  icon: React.ComponentType<React.ComponentProps<typeof Icon>>,
  href: string,
  label: string,
];

type LinkWithPermissions = [
  icon: React.ComponentType<React.ComponentProps<typeof Icon>>,
  href: string,
  label: string,
  permissions: Permission[],
];

export const NAVIGATION_LINKS: Array<Link | LinkWithPermissions> = [
  [DashboardIcon, "/dashboard", "Dashboard"],
  [FilesIcon, "/dashboard/files", "Files", ["stratas.files.view"]],
  [
    PaidDocumentIcon,
    "/dashboard/invoices",
    "Invoices",
    ["stratas.invoices.view"],
  ],
  [CalendarIcon, "/dashboard/calendar", "Events", ["stratas.events.view"]],
  [PersonIcon, "/dashboard/membership", "Directory"],
  [BedIcon, "/dashboard/amenities", "Amenities", ["stratas.amenities.view"]],
  [GroupIcon, "/dashboard/meetings", "Meetings", ["stratas.meetings.edit"]],
  [InboxIcon, "/dashboard/inbox", "Strata Inbox"],
  [SettingsIcon, "/dashboard/settings", "Settings", ["stratas.edit"]],
];
