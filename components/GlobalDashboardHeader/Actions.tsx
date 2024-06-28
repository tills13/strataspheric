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
      {session?.user && (
        <>
          <div className={styles.sessionInfoRow}>
            <PersonIcon height={vars.sizes.small} />
            <div className={classnames(styles.sessionUserName)}>
              {session.user.name}
              <br />
              {session.user.email}
            </div>
          </div>
          <ExternalLink
            href={protocol + "//" + tld + "/profile"}
            target="_blank"
          >
            <Button>Edit Profile</Button>
          </ExternalLink>
        </>
      )}

      <div className={styles.spacer} />

      <Suspense>
        <HeaderJoinStrataButton />
      </Suspense>

      {session ? (
        <SignOutButton
          className={styles.globalHeaderActionsButton}
          style="secondary"
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
