"use client";

import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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
  badgeCounts?: Record<string, number>;
  breadcrumbs?: React.ReactNode;
}

export function MobileSubheaderNavigation({
  links,
  badgeCounts,
  breadcrumbs,
}: Props) {
  const pathname = usePathname();
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  return (
    <div className={styles.subHeaderContainer}>
      <Group className={styles.subheader} align="start" justify="space-between">
        <div
          style={assignInlineVars({
            [styles.numHeaderItemsVar]: links.length.toString(),
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
                <div key={href} className={styles.activeSubheaderLink}>
                  <IconComponent classNameOverride={styles.mobileMenuIcon} />
                  {breadcrumbs ?? label}
                  {badge !== undefined && badge > 0 && (
                    <span className={styles.mobileBadge}>{badge}</span>
                  )}
                  &nbsp;
                </div>
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
