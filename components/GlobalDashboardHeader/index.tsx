import * as styles from "./style.css";

import { type Session } from "next-auth";

import { Strata } from "../../db";
import { GlobalHeader } from "../GlobalHeader";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeaderActions } from "./Actions";
import { GlobalHeaderMobileActions } from "./MobileActions";

interface Props {
  session: Session | null;
  strata: Strata;
}

export function GlobalDashboardHeader({ session, strata }: Props) {
  return (
    <GlobalHeader className={styles.globalHeader}>
      <div>
        <h1>
          <InternalLink
            className={styles.globalHeaderTitle}
            href="/"
            noUnderline
          >
            {strata.name}
          </InternalLink>
        </h1>
      </div>
      <GlobalHeaderActions
        className={styles.globalHeaderDesktopActions}
        session={session}
        strata={strata}
      />
      <GlobalHeaderMobileActions session={session} strata={strata} />
    </GlobalHeader>
  );
}
