"use client";

import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

import { SubLink } from "../../constants/navigation";
import { Button } from "../Button";
import { Group } from "../Group";
import { DownIcon } from "../Icon/DownIcon";
import { InternalLink } from "../Link/InternalLink";

export interface MobileSubheaderLink {
  icon: React.ComponentType<{ classNameOverride?: string }>;
  href: string;
  label: string;
  exact?: boolean;
}

interface Props {
  links: MobileSubheaderLink[];
  subLinks?: Record<string, SubLink[]>;
  badgeCounts?: Record<string, number>;
  breadcrumbs?: React.ReactNode;
}

export function MobileSubheaderNavigation({
  links,
  subLinks,
  badgeCounts,
  breadcrumbs,
}: Props) {
  const pathname = usePathname();
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  // Find the active parent link and its sub-links
  const activeParentHref = useMemo(
    () =>
      links.find(({ href, exact }) =>
        exact
          ? pathname === href
          : pathname === href || pathname?.startsWith(href + "/"),
      )?.href,
    [links, pathname],
  );

  const activeSubLinks = activeParentHref
    ? subLinks?.[activeParentHref]
    : undefined;

  // Total items for height calculation includes sub-links when active parent has them
  const totalItems = links.length + (activeSubLinks?.length ?? 0);

  return (
    <div className={styles.subHeaderContainer}>
      <Group className={styles.subheader} align="start" justify="space-between">
        <div
          style={assignInlineVars({
            [styles.numHeaderItemsVar]: totalItems.toString(),
          })}
          className={
            mobileMenuExpanded ? styles.linksRailOpen : styles.linksRail
          }
        >
          {links.map(({ icon: IconComponent, href, label, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname === href || pathname?.startsWith(href + "/");
            const badge = badgeCounts?.[href];

            if (isActive) {
              return (
                <React.Fragment key={href}>
                  <div className={styles.activeSubheaderLink}>
                    <IconComponent classNameOverride={styles.mobileMenuIcon} />
                    {breadcrumbs ?? label}
                    {badge !== undefined && badge > 0 && (
                      <span className={styles.mobileBadge}>{badge}</span>
                    )}
                    &nbsp;
                  </div>
                  {activeSubLinks?.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = pathname === sub.href;

                    return (
                      <InternalLink
                        key={sub.href}
                        className={
                          isSubActive ? styles.activeSubLink : styles.subLink
                        }
                        onClick={() => setMobileMenuExpanded(false)}
                        href={sub.href}
                      >
                        <SubIcon classNameOverride={styles.mobileMenuIcon} />
                        <div className={styles.mobileMenuText}>{sub.label}</div>
                      </InternalLink>
                    );
                  })}
                </React.Fragment>
              );
            } else {
              return (
                <InternalLink
                  key={href}
                  className={styles.subheaderLink}
                  onClick={() => setMobileMenuExpanded(false)}
                  href={href}
                >
                  <IconComponent classNameOverride={styles.mobileMenuIcon} />
                  <div className={styles.mobileMenuText}>{label}</div>
                  {badge !== undefined && badge > 0 && (
                    <span className={styles.mobileBadge}>{badge}</span>
                  )}
                </InternalLink>
              );
            }
          })}
        </div>

        <Button
          className={styles.mobileDropdownAction}
          onClick={() => setMobileMenuExpanded(!mobileMenuExpanded)}
          icon={
            <DownIcon
              className={
                mobileMenuExpanded
                  ? styles.toggleMobileDropdownIconActive
                  : styles.toggleMobileDropdownIcon
              }
            />
          }
          size="small"
          style="tertiary"
        />
      </Group>
    </div>
  );
}
