"use client";

import * as styles from "./style.css";

import { usePathname } from "next/navigation";

import { NAVIGATION_LINK_ICONS } from "../../constants/navigation";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Text } from "../Text";

interface Props {
  href: string;
  badge?: number;
  children: string;
}

export function SidebarNavigationItem({ badge, children, href }: Props) {
  const pathname = usePathname();

  const isActive =
    href === "/dashboard" ? pathname === href : pathname?.startsWith(href);
  const IconComponent = NAVIGATION_LINK_ICONS[href];

  return (
    <InternalLink
      key={href}
      className={
        isActive
          ? styles.activeSidebarNavigationItem
          : styles.sidebarNavigationItem
      }
      href={href}
    >
      <Group pv="10" ph="12" gap="10">
        <IconComponent size="xs" />
        <Text as="span" whiteSpace="nowrap" fontSize="normal">
          {children}
        </Text>
        {badge !== undefined && badge > 0 && (
          <span className={styles.sidebarBadge}>{badge}</span>
        )}
      </Group>
    </InternalLink>
  );
}
