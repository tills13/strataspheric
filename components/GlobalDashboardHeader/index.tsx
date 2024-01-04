import * as styles from "./style.css";

import { auth } from "../../auth";
import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { GlobalHeader } from "../GlobalHeader";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeaderActions } from "./Actions";
import { GlobalHeaderMobileActions } from "./MobileActions";

interface Props {
  joinStrata: () => void;
}

export async function GlobalDashboardHeader({ joinStrata }: Props) {
  const strata = await getCurrentStrata();

  if (!strata) {
    return null;
  }

  return (
    <GlobalHeader className={styles.globalHeader}>
      <div>
        <h1>
          <InternalLink className={styles.titleLink} href="/">
            {strata.name}
          </InternalLink>
        </h1>
      </div>
      <GlobalHeaderActions
        className={styles.globalHeaderDesktopActions}
        joinStrata={joinStrata}
      />
      <GlobalHeaderMobileActions strata={strata} />
    </GlobalHeader>
  );
}
