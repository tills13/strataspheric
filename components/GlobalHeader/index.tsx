import * as styles from "./style.css";
import Link from "next/link";
import { type Strata } from "../../data/stratas/getStrata";
import { type Session } from "next-auth";

import { SignOutButton } from "../SignOutButton";
import { Button } from "../Button";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeaderActions } from "./Actions";
import { GlobalHeaderMobileActions } from "./MobileActions";

interface Props {
  session: Session | null;
  strata: Strata;
}

export function GlobalHeader({ session, strata }: Props) {
  return (
    <header className={styles.globalHeader}>
      <div>
        <Header priority={1}>
          <InternalLink
            className={styles.globalHeaderTitle}
            href="/"
            noUnderline
          >
            {strata.name}
          </InternalLink>
        </Header>
      </div>
      <GlobalHeaderActions
        className={styles.globalHeaderDesktopActions}
        session={session}
        strata={strata}
      />
      <GlobalHeaderMobileActions session={session} strata={strata} />
    </header>
  );
}
