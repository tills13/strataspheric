import { vars } from "../../app/theme.css";
import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { auth } from "../../auth";
import { protocol, tld } from "../../constants";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { PersonIcon } from "../Icon/PersonIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { InternalLink } from "../Link/InternalLink";
import { SignOutButton } from "../SignOutButton";
import { HeaderJoinStrataButton } from "./HeaderJoinStrataButton";

interface Props {
  className?: string;
}

export async function GlobalHeaderActions({ className }: Props) {
  const session = await auth();

  return (
    <div className={classnames(styles.globalHeaderActions, className)}>
      <div className={styles.spacer} />

      <Suspense>
        <HeaderJoinStrataButton />
      </Suspense>

      {session ? (
        <SignOutButton
          className={styles.globalHeaderActionsButton}
          style="tertiary"
          color="primary"
        />
      ) : (
        <InternalLink className={linkStyles.noUnderline} href="/?action=signin">
          <Button className={styles.globalHeaderActionsButton} style="tertiary">
            Sign In
          </Button>
        </InternalLink>
      )}
    </div>
  );
}
