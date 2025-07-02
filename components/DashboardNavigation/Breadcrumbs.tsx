"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  NAVIGATION_LINKS,
  NAVIGATION_LINK_ICONS,
} from "../../constants/navigation";
import { Group } from "../Group";
import { RightIcon } from "../Icon/RightIcon";
import { InternalLink } from "../Link/InternalLink";
import { Text } from "../Text";

interface Props {
  className?: string;
  subPageTitle?: string;
}

export function Breadcrumbs({ className, subPageTitle }: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.scrollTo({ left: ref.current.clientWidth, behavior: "smooth" });
  }, [pathname]);

  const activeSubpage = NAVIGATION_LINKS.find(([href]) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href),
  );

  if (!activeSubpage) {
    return null;
  }

  const [activeSubpageHref, activeSubpageLabel] = activeSubpage;
  const SubSubpageIconComponent = NAVIGATION_LINK_ICONS[activeSubpageHref];
  const isSubSubpage = pathname !== activeSubpageHref;

  if (pathname === "/dashboard") {
    return <div />;
  }

  return (
    <Group className={className} gap="xs" ref={ref}>
      <InternalLink href="/dashboard" noUnderline>
        <Text color="secondary">Dashboard</Text>
      </InternalLink>

      <RightIcon size="xxs" />

      <InternalLink href={activeSubpageHref} noUnderline={!isSubSubpage}>
        <Text
          color="primary"
          fw={isSubSubpage ? "normal" : "bold"}
          whiteSpace="nowrap"
        >
          {activeSubpageLabel}
        </Text>
      </InternalLink>

      {isSubSubpage && (
        <>
          <RightIcon size="xxs" />
          <Group gap="xs">
            <SubSubpageIconComponent size="xs" />
            {subPageTitle}
          </Group>
        </>
      )}
    </Group>
  );
}
