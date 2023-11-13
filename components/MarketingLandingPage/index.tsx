import { Button } from "../Button";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { PricingCard } from "../PricingCard";
import * as styles from "./style.css";
export function MarketingLandingPage() {
  return (
    <div>
      <section className={styles.section}></section>
      <section className={styles.ctaSection}>
        <Header className={styles.ctaHeader} priority={2}>
          Onboard today to
          <br />
          streamline your strata
        </Header>
        <p className={styles.ctaText}></p>
        <InternalLink href="/get-started">
          <Button className={styles.ctaButton}>Begin Onboarding</Button>
        </InternalLink>
      </section>
      <section className={styles.sectionPadded}>
        <Header className={styles.sectionHeader} priority={2}>
          Plans
        </Header>
        <PricingCard planName="Basic" />
      </section>
    </div>
  );
}
