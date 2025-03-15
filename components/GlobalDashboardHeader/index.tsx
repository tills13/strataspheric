import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { auth, mustAuth } from "../../auth";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { getUserStratas } from "../../data/users/getUserStratas";
import { GlobalHeader } from "../GlobalHeader";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeaderActions } from "./Actions";
import { GlobalHeaderMobileActions } from "./MobileActions";
import { ServerUserStrataSelector } from "./ServerUserStrataSelector";
import { UserStrataSelector } from "./UserStrataSelector";

export async function GlobalDashboardHeader() {
  const strata = await mustGetCurrentStrata();

  return (
    <GlobalHeader className={styles.globalHeader}>
      <Suspense
        fallback={
          <UserStrataSelector currentStrata={strata} sessionStratas={[]} />
        }
      >
        <ServerUserStrataSelector currentStrata={strata} />
      </Suspense>
      <GlobalHeaderActions className={styles.globalHeaderActionsDesktop} />
      <GlobalHeaderMobileActions
        actions={<GlobalHeaderActions />}
        strata={strata}
      />
    </GlobalHeader>
  );
}
