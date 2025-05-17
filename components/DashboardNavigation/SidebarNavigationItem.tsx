"use client";

import * as styles from "./style.css";

import { usePathname } from "next/navigation";

import { NAVIGATION_LINK_ICONS } from "../../constants/navigation";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Text } from "../Text";

interface Props {
  href: string;
  children: string;
}

export function SidebarNavigationItem({ children, href }: Props) {
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
      <Group pv="small" ph="normal">
        <IconComponent size="xs" />
        <Text as="span" whiteSpace="nowrap">
          {children}
        </Text>
      </Group>
    </InternalLink>
  );
}
