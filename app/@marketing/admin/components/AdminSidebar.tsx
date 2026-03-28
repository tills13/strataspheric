"use client";

import * as navStyles from "../../../../components/DashboardNavigation/style.css";
import * as styles from "../style.css";

import { usePathname } from "next/navigation";

import { Group } from "../../../../components/Group";
import { DashboardIcon } from "../../../../components/Icon/DashboardIcon";
import { GroupIcon } from "../../../../components/Icon/GroupIcon";
import { Icon } from "../../../../components/Icon/Icon";
import { PersonIcon } from "../../../../components/Icon/PersonIcon";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Stack } from "../../../../components/Stack";
import { Text } from "../../../../components/Text";

const ADMIN_NAV_LINKS: Array<{
  href: string;
  label: string;
  icon: React.ComponentType<React.ComponentProps<typeof Icon>>;
}> = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/stratas", label: "Stratas", icon: GroupIcon },
  { href: "/admin/users", label: "Users", icon: PersonIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.adminSidebar}>
      <div className={styles.adminSidebarTitle}>Admin</div>
      <Stack gap="small" p="small">
        {ADMIN_NAV_LINKS.map(({ href, label, icon: IconComponent }) => {
          const isActive =
            href === "/admin" ? pathname === href : pathname?.startsWith(href);

          return (
            <InternalLink
              key={href}
              className={
                isActive
                  ? navStyles.activeSidebarNavigationItem
                  : navStyles.sidebarNavigationItem
              }
              href={href}
            >
              <Group pv="small" ph="normal">
                <IconComponent size="xs" />
                <Text as="span" whiteSpace="nowrap">
                  {label}
                </Text>
              </Group>
            </InternalLink>
          );
        })}
      </Stack>
    </div>
  );
}
