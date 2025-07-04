import * as styles from "./style.css";

import { Suspense } from "react";

import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { GlobalHeader } from "../GlobalHeader";
import { GlobalHeaderActions } from "./Actions";
import { Breadcrumbs } from "./Breadcrumbs";
import { GlobalHeaderMobileActions } from "./MobileActions";
import { ServerUserStrataSelectorButton } from "./ServerUserStrataSelectorButton";
import { UserStrataSelectorButton } from "./UserStrataSelectorButton";

interface Props {
  subPageTitle?: string;
}

export async function GlobalDashboardHeader({ subPageTitle }: Props) {
  const strata = await mustGetCurrentStrata();

  return (
    <GlobalHeader className={styles.globalHeader}>
      <Suspense
        fallback={
          <UserStrataSelectorButton
            currentStrata={strata}
            sessionStratas={[]}
          />
        }
      >
        <ServerUserStrataSelectorButton currentStrata={strata} />
      </Suspense>
      <Breadcrumbs
        className={styles.globalHeaderBreadcrumbs}
        subPageTitle={subPageTitle}
      />
      <GlobalHeaderActions className={styles.globalHeaderActionsDesktop} />
      <GlobalHeaderMobileActions
        actions={<GlobalHeaderActions />}
        strata={strata}
      />
    </GlobalHeader>
  );
}
