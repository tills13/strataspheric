import { auth } from "../../../auth";
import { Button } from "../../../components/Button";
import { ElementGroup } from "../../../components/ElementGroup";
import { Header } from "../../../components/Header";
import { ExternalLink } from "../../../components/Link/ExternalLink";
import { InternalLink } from "../../../components/Link/InternalLink";
import { Panel } from "../../../components/Panel";
import { PricingCard } from "../../../components/PricingCard";
import { getMemberStratas } from "../../../data/members/getMemberStratas";
import { classnames } from "../../../utils/classnames";
import * as styles from "./style.css";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  const sessionStratas = session?.user?.id
    ? await getMemberStratas(session.user.id)
    : [];

  return (
    <div>
      <section className={classnames(styles.ctaSection)}>
        <Header className={styles.ctaHeader} priority={2}>
          Launch your strata
          <br />
          into the stratosphere
        </Header>
        <p className={styles.ctaText}></p>
        <InternalLink href="/get-started">
          <Button className={styles.ctaButton} variant="primary" size="xl">
            Begin Onboarding
          </Button>
        </InternalLink>
      </section>

      <section
        className={classnames(styles.sectionPadded, styles.plansSection)}
      >
        <div className={styles.plansContainer}>
          <PricingCard planName="Basic" />
          <PricingCard planName="Standard" />
          <PricingCard planName="Advanced" />
        </div>
      </section>

      {sessionStratas.length !== 0 && (
        <Panel className={styles.continuePanel}>
          <Header className={styles.continuePanelHeader} priority={3}>
            Continue where you left off...
          </Header>
          <ElementGroup
            className={styles.continuePanelList}
            orientation="column"
          >
            {sessionStratas.map((strata) => (
              <ExternalLink
                key={strata.domain}
                href={strata.domain}
                target="_blank"
              >
                <Button className={styles.continuePanelListButton}>
                  Go to {strata.name}
                </Button>
              </ExternalLink>
            ))}
          </ElementGroup>
        </Panel>
      )}
    </div>
  );
}
