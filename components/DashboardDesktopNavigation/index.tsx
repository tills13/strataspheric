"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { NAVIGATION_LINKS } from "../../constants/navigation";
import { can, p } from "../../data/users/permissions";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { DropdownActions } from "../DropdownActions";
import { Group } from "../Group";
import { BedIcon } from "../Icon/BedIcon";
import { CalendarIcon } from "../Icon/CalendarIcon";
import { DashboardIcon } from "../Icon/DashboardIcon";
import { DownIcon } from "../Icon/DownIcon";
import { FilesIcon } from "../Icon/FilesIcon";
import { GroupIcon } from "../Icon/GroupIcon";
import { InboxIcon } from "../Icon/InboxIcon";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { PersonIcon } from "../Icon/PersonIcon";
import { SettingsIcon } from "../Icon/SettingsIcon";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { Wrap } from "../Wrap";

interface Props {
  actions?: React.ComponentProps<typeof DropdownActions>["actions"];
}

export function DashboardDesktopNavigation({ actions }: Props) {
  const [collapsed, setCollapsed] = useState();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

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
