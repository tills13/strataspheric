"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { NAVIGATION_LINKS } from "../../constants/navigation";
import { can } from "../../data/users/permissions";
import { classnames } from "../../utils/classnames";
import { DropdownActions } from "../DropdownActions";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {}

export function DashboardDesktopNavigation({}: Props) {
  const { data: session } = useSession();
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
                <Text noWrap>{label}</Text>
              </Group>
            </InternalLink>
          );
        })}
      </Stack>
    </div>
  );
}
