"use client";

import * as navStyles from "../../../../components/DashboardNavigation/style.css";
import * as styles from "../style.css";

import { usePathname } from "next/navigation";

import { Group } from "../../../../components/Group";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Stack } from "../../../../components/Stack";
import { Text } from "../../../../components/Text";
import { ADMIN_NAV_LINKS } from "./adminNavLinks";

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
