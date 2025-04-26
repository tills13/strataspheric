"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { usePathname } from "next/navigation";
import React from "react";

import { NAVIGATION_LINKS } from "../../constants/navigation";
import { can } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {}

export function DashboardDesktopNavigation({}: Props) {
  const session = useSession();
  const pathname = usePathname();

  const filteredMenuItems = NAVIGATION_LINKS.filter(
    ([, , , permissions]) => !permissions || can(session?.user, ...permissions),
  );

  return (
    <div className={classnames(styles.navigation, s({ p: "small" }))}>
      <Stack gap="small">
        {filteredMenuItems.map(([IconComponent, href, label]) => {
          const isActive =
            href === "/dashboard"
              ? pathname === href
              : pathname?.startsWith(href);

          return (
            <InternalLink
              key={href}
              className={
                isActive ? styles.activeNavigationItem : styles.navigationItem
              }
              href={href}
            >
              <Group className={s({ pv: "small", ph: "normal" })}>
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
