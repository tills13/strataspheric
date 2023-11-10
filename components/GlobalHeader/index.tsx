import * as styles from "./style.css";
import Link from "next/link";
import { type Strata } from "../../data/stratas/getStrata";
import { type Session } from "next-auth";

import { SignOutButton } from "../SignOutButton";
import { Button } from "../Button";
import { Header } from "../Header";

interface Props {
  session: Session | null;
  strata: Strata;
}

export function GlobalHeader({ session, strata }: Props) {
  return (
    <div className={styles.globalHeader}>
      <div>
        <Header priority={1}>{strata.name}</Header>
        {/* <Breadcrumbs /> */}
      </div>
      <div className={styles.globalHeaderActions}>
        {session ? (
          <>
            <span>{session.user?.name}</span>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/?action=join">
              <Button>Join {strata.name}</Button>
            </Link>
            <Link href="/?action=signin">
              <Button>Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
