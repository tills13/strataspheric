"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useQuery } from "@tanstack/react-query";

import { getUserStratas } from "../../data/users/getUserStratas";
import { useSession } from "../../hooks/useSession";
import { Button } from "../Button";
import { GoToStrataLinkButton } from "../GoToStrataLinkButton";
import { Group } from "../Group";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { Panel } from "../Panel";
import { ContinueWhereYouLeftOffWidgetDropdownActions } from "./ContinueWhereYouLeftOffWidgetDropdownActions";

export function ContinueWhereYouLeftOffWidget() {
  const session = useSession();

  const { data: sessionStratas = [] } = useQuery({
    queryKey: [session?.user?.id, "stratas"],
    queryFn: () =>
      session ? getUserStratas(session.user.id) : Promise.resolve([]),
  });

  return (
    <Panel className={styles.continuePanel}>
      <Header className={s({ mb: "normal" })} as="h3">
        Continue where you left off...
      </Header>
      <div className={styles.spacer} />
      <Group className={styles.continuePanelList} gap="small">
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
                <Button color="default">Find a Strata</Button>
              </InternalLink>
            )}
            <ContinueWhereYouLeftOffWidgetDropdownActions />
          </>
        ) : (
          <InternalLink className={styles.continueAction} href="/sign-in">
            <Button color="default">Sign In</Button>
          </InternalLink>
        )}
      </Group>
    </Panel>
  );
}
