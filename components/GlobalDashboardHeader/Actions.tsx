import { s } from "../../sprinkles.css";
import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { auth } from "../../auth";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { InternalLink } from "../Link/InternalLink";
import { SignOutButton } from "../SignOutButton";
import { Text } from "../Text";
import { HeaderJoinStrataButton } from "./HeaderJoinStrataButton";

interface Props {
  className?: string;
}

export async function GlobalHeaderActions({ className }: Props) {
  const session = await auth();

  return (
    <div
      className={classnames(
        className,
        styles.globalHeaderActions,
        s({ ph: "normal" }),
      )}
    >
      <div className={styles.spacer} />

      <Suspense>
        <HeaderJoinStrataButton />
      </Suspense>

      {session ? (
        <>
          <Text color="secondary">{session.user.email}</Text>
          <SignOutButton
            className={styles.globalHeaderActionsButton}
            style="tertiary"
            color="primary"
          />
        </>
      ) : (
        <InternalLink className={linkStyles.noUnderline} href="/?action=signin">
          <Button
            className={classnames(styles.globalHeaderActionsButton)}
            color="primary"
            style="tertiary"
          >
            Sign In
          </Button>
        </InternalLink>
      )}
    </div>
  );
}
