import * as styles from "./style.css";

import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { GlobalHeader } from "../GlobalHeader";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeaderActions } from "./Actions";
import { GlobalHeaderMobileActions } from "./MobileActions";

export async function GlobalDashboardHeader() {
  const strata = await mustGetCurrentStrata();

  return (
    <GlobalHeader className={styles.globalHeader}>
      <div>
        <Header priority={1}>
          <InternalLink className={styles.titleLink} href="/">
            {strata.name}
          </InternalLink>
        </Header>
      </div>
      <GlobalHeaderActions className={styles.globalHeaderActionsDesktop} />
      <GlobalHeaderMobileActions
        actions={<GlobalHeaderActions />}
        strata={strata}
      />
    </GlobalHeader>
  );
}
