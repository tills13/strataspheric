"use client";

import * as styles from "./style.css";

import { usePathname } from "next/navigation";

import { classnames } from "../../utils/classnames";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";

interface Props {
  className?: string;
}

export function SignInJoinNavigation({ className }: Props) {
  const pathname = usePathname();

  return (
    <div className={classnames(styles.signInJoinNavigation, className)}>
      <InternalLink
        className={
          pathname === "/sign-in"
            ? styles.activeNavigationItem
            : styles.navigationItem
        }
        href="/sign-in"
      >
        <Header priority={2}>Sign In</Header>
      </InternalLink>
      <InternalLink
        className={
          pathname === "/join"
            ? styles.activeNavigationItem
            : styles.navigationItem
        }
        href="/join"
      >
        <Header priority={2}>Join</Header>
      </InternalLink>
    </div>
  );
}
