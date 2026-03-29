import React from "react";

import { DashboardIcon } from "../../../../components/Icon/DashboardIcon";
import { GroupIcon } from "../../../../components/Icon/GroupIcon";
import { Icon } from "../../../../components/Icon/Icon";
import { PersonIcon } from "../../../../components/Icon/PersonIcon";

export const ADMIN_NAV_LINKS: Array<{
  href: string;
  label: string;
  icon: React.ComponentType<React.ComponentProps<typeof Icon>>;
  exact?: boolean;
}> = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/admin/stratas", label: "Stratas", icon: GroupIcon },
  { href: "/admin/users", label: "Users", icon: PersonIcon },
];
