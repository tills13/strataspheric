"use client";

import * as styles from "./style.css";

import { signOut, useSession } from "next-auth/react";
import { useSelectedLayoutSegment } from "next/navigation";

import { Strata } from "../../data";
import { Button } from "../Button";
import { DropdownActions } from "../DropdownActions";
import { ElementGroup } from "../ElementGroup";
import { GoToStrataLink } from "../GoToStrataLink";
import { Header } from "../Header";
import { SignOutIcon } from "../Icon/SignOutIcon";
import { InternalLink } from "../Link/InternalLink";
import { Panel } from "../Panel";
import { SignOutButton } from "../SignOutButton";

interface Props {
  className?: string;
  sessionStratas: Strata[];
}

export function ContinueWhereYouLeftOffWidget({
  className,
  sessionStratas,
}: Props) {
  const { data: session } = useSession();
  const isMarketingSegment =
    useSelectedLayoutSegment("marketing") !== "__DEFAULT__";

  if (!isMarketingSegment) {
    return null;
  }

  return (
    <Panel className={styles.continuePanel}>
      <Header className={styles.continuePanelHeader} priority={3}>
        Continue where you left off...
      </Header>
      <div className={styles.spacer} />
      <ElementGroup className={styles.continuePanelList}>
        {session && sessionStratas.length !== 0 ? (
          <>
            <GoToStrataLink
              key={sessionStratas[0].domain}
              className={styles.continueAction}
              strata={sessionStratas[0]}
            />
            <DropdownActions
              actions={[
                {
                  action() {
                    signOut({ redirect: false });
                  },
                  label: "Sign Out",
                  icon: <SignOutIcon />,
                },
              ]}
              direction="up"
            />
          </>
        ) : (
          <InternalLink className={styles.continueAction} href="/sign-in">
            <Button>Sign In</Button>
          </InternalLink>
        )}
      </ElementGroup>
    </Panel>
  );
}
