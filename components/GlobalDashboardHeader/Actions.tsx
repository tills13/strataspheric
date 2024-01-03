import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { Session } from "next-auth";

import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { InternalLink } from "../Link/InternalLink";
import { SignOutButton } from "../SignOutButton";

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
          <span className={styles.sessionUserName}>{session.user?.name}</span>
          <SignOutButton
            className={styles.globalHeaderActionsButton}
            style="secondary"
          />
        </>
      ) : (
        <>
          <InternalLink className={linkStyles.noUnderline} href="/?action=join">
            <Button
              className={styles.globalHeaderActionsButton}
              style="secondary"
            >
              Join {strata.name}
            </Button>
          </InternalLink>
          <InternalLink
            className={linkStyles.noUnderline}
            href="/?action=signin"
          >
            <Button
              className={styles.globalHeaderActionsButton}
              style="secondary"
            >
              Sign In
            </Button>
          </InternalLink>
        </>
      )}
    </div>
  );
}
