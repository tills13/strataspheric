import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { auth } from "../../auth";
import { protocol, tld } from "../../constants";
import { getStrataMembership } from "../../data/strataMemberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { JoinStrataButton } from "../JoinStrataButton";
import { ExternalLink } from "../Link/ExternalLink";
import { InternalLink } from "../Link/InternalLink";
import { SignOutButton } from "../SignOutButton";

interface Props {
  className?: string;
  joinStrata: () => void;
}

export async function GlobalHeaderActions({ className, joinStrata }: Props) {
  const strata = await mustGetCurrentStrata();
  const session = await auth()!;

  const strataMemebership = session?.user.id
    ? await getStrataMembership(strata.id, session?.user.id)
    : undefined;

  return (
    <div className={classnames(styles.globalHeaderActions, className)}>
      {session?.user && (
        <ExternalLink
          className={styles.sessionUserName}
          href={protocol + "//" + tld + "/profile"}
          target="_blank"
        >
          {session.user.name}
        </ExternalLink>
      )}

      <JoinStrataButton
        joinStrata={joinStrata}
        strata={strata}
        strataMembership={strataMemebership}
        user={session?.user}
      />

      {session ? (
        <SignOutButton
          className={styles.globalHeaderActionsButton}
          style="secondary"
        />
      ) : (
        <InternalLink className={linkStyles.noUnderline} href="/?action=signin">
          <Button
            className={styles.globalHeaderActionsButton}
            style="secondary"
          >
            Sign In
          </Button>
        </InternalLink>
      )}
    </div>
  );
}
