"use client";

import * as styles from "./style.css";

import { usePathname } from "next/navigation";

import {
  NAVIGATION_LINK_ICONS,
  NAVIGATION_SUB_LINKS,
} from "../../constants/navigation";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  href: string;
  badge?: number;
  badgeCounts?: Record<string, number>;
  children: string;
}

export function SidebarNavigationItem({
  badge,
  badgeCounts,
  children,
  href,
}: Props) {
  const pathname = usePathname();

  const isActive =
    href === "/dashboard" ? pathname === href : pathname?.startsWith(href);
  const IconComponent = NAVIGATION_LINK_ICONS[href];
  const subLinks = NAVIGATION_SUB_LINKS[href];

  const subLinkBadgeTotal = !isActive
    ? subLinks?.reduce((sum, sub) => sum + (badgeCounts?.[sub.href] ?? 0), 0) ??
      0
    : 0;
  const displayBadge = (badge ?? 0) + subLinkBadgeTotal || undefined;

  return (
    <Stack gap="xs">
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
          {displayBadge !== undefined && displayBadge > 0 && (
            <span className={styles.sidebarBadge}>{displayBadge}</span>
          )}
        </Group>
      </InternalLink>
      {isActive &&
        subLinks?.map((sub) => {
          const isSubActive = pathname === sub.href;
          const SubIcon = sub.icon;
          const subBadge = badgeCounts?.[sub.href];

          return (
            <InternalLink
              key={sub.href}
              className={
                isSubActive
                  ? styles.activeSidebarSubNavigationItem
                  : styles.sidebarSubNavigationItem
              }
              href={sub.href}
            >
              <Group pv="6" ph="12" gap="10">
                <SubIcon size="xs" />
                <Text as="span" whiteSpace="nowrap">
                  {sub.label}
                </Text>
                {subBadge !== undefined && subBadge > 0 && (
                  <span className={styles.sidebarBadge}>{subBadge}</span>
                )}
              </Group>
            </InternalLink>
          );
        })}
    </Stack>
  );
}
