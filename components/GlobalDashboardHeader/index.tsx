import * as styles from "./style.css";

import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { GlobalHeader } from "../GlobalHeader";
import { Header } from "../Header";
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
        <Header priority={1}>
          <InternalLink className={styles.titleLink} href="/">
            {strata.name}
          </InternalLink>
        </Header>
      </div>
      <GlobalHeaderActions
        className={styles.globalHeaderActionsDesktop}
        joinStrata={joinStrata}
      />
      <GlobalHeaderMobileActions
        actions={<GlobalHeaderActions joinStrata={joinStrata} />}
        strata={strata}
      />
    </GlobalHeader>
  );
}
