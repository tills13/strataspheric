"use client";

import * as styles from "./style.css";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useSelectedLayoutSegment } from "next/navigation";

import { protocol, tld } from "../../constants";
import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { DropdownActions } from "../DropdownActions";
import { ElementGroup } from "../ElementGroup";
import { GoToStrataLinkButton } from "../GoToStrataLinkButton";
import { Header } from "../Header";
import { SignOutIcon } from "../Icon/SignOutIcon";
import { InternalLink } from "../Link/InternalLink";
import { Panel } from "../Panel";

interface Props {
  className?: string;
  session: Session | null;
  sessionStratas: Strata[];
}

export function ContinueWhereYouLeftOffWidget({
  className,
  session,
  sessionStratas,
}: Props) {
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
      <ElementGroup className={styles.continuePanelList} gap="small">
        {session ? (
          <>
            {sessionStratas.length ? (
              <GoToStrataLinkButton
                key={sessionStratas[0].domain}
                className={styles.continueAction}
                strata={sessionStratas[0]}
              />
            ) : (
              <InternalLink className={styles.continueAction} href="/find">
                <Button>Find a Strata</Button>
              </InternalLink>
            )}
            <DropdownActions
              actions={[
                {
                  async action() {
                    await signOut({ redirect: false });
                    location.href = protocol + "//" + tld;
                  },
                  label: "Sign Out",
                  icon: <SignOutIcon />,
                },
              ]}
              className={styles.continueActionOverflow}
              direction="up"
              buttonStyle="tertiary"
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
