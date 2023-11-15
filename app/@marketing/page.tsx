import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { InternalLink } from "../../components/Link/InternalLink";
import { PricingCard } from "../../components/PricingCard";
import * as styles from "./style.css";

export const runtime = "edge";

export default async function Page() {
  return (
    <div>
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
        <div className={styles.plansContainer}>
          <div />
          <PricingCard planName="Basic" />

          <div />
        </div>
      </section>
    </div>
  );
}
