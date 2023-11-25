import * as styles from "./style.css";

import { auth } from "../../auth";
import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { GlobalHeader } from "../GlobalHeader";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeaderActions } from "./Actions";
import { GlobalHeaderMobileActions } from "./MobileActions";

export async function GlobalDashboardHeader() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    return null;
  }

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
