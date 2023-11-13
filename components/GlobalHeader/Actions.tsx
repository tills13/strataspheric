import * as styles from "./style.css";

import Link from "next/link";
import { SignOutButton } from "../SignOutButton";

import { Session } from "next-auth";
import { Button } from "../Button";
import { Strata } from "../../data/stratas/getStrata";
import { GlobalHeaderMobileActions } from "./MobileActions";
import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  session: Session | null;
  strata: Strata;
}

export function GlobalHeaderActions({ className, session, strata }: Props) {
  return (
    <div className={classnames(styles.globalHeaderActions, className)}>
      {session ? (
        <>
          <span>{session.user?.name}</span>
          <SignOutButton className={styles.globalHeaderActionsButton} />
        </>
      ) : (
        <>
          <Link href="/?action=join">
            <Button className={styles.globalHeaderActionsButton}>
              Join {strata.name}
            </Button>
          </Link>
          <Link href="/?action=signin">
            <Button className={styles.globalHeaderActionsButton}>
              Sign In
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
