"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { can } from "../../db/users/permissions";
import { InternalLink } from "../Link/InternalLink";

type Link = [href: string, label: string];
type LinkWithPermissions = [href: string, label: string, permissions: string[]];

const links: Array<Link | LinkWithPermissions> = [
  ["/dashboard", "Dashboard"],
  ["/dashboard/membership", "Membership"],
  ["/dashboard/inbox", "Inbox", ["stratas.edit"]],
  ["/dashboard/settings", "Settings", ["stratas.edit"]],
];

export function DashboardHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className={styles.subheader}>
      {links.map(([href, label, permissions = []]) => {
        const isActive =
          href === "/dashboard"
            ? pathname === href
            : pathname?.startsWith(href);

        if (permissions && !can(session?.user, ...permissions)) {
          return null;
        }

        return (
          <InternalLink
            key={href}
            className={
              isActive ? styles.activeSubheaderLink : styles.subheaderLink
            }
            href={href}
          >
            {label}
          </InternalLink>
        );
      })}
    </div>
  );
}
