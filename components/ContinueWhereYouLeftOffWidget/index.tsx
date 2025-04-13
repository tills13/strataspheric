import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../auth";
import { getUserStratas } from "../../data/users/getUserStratas";
import { Button } from "../Button";
import { GoToStrataLinkButton } from "../GoToStrataLinkButton";
import { Group } from "../Group";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { Panel } from "../Panel";
import { ContinueWhereYouLeftOffWidgetDropdownActions } from "./ContinueWhereYouLeftOffWidgetDropdownActions";

export async function ContinueWhereYouLeftOffWidget() {
  const session = await auth();
  const sessionStratas = session?.user?.id
    ? await getUserStratas(session.user.id)
    : [];

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
