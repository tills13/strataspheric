import { auth } from "../../../auth";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { classnames } from "../../../utils/classnames";
import * as styles from "./style.css";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

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
    </div>
  );
}
