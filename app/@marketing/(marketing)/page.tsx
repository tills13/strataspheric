import * as styles from "./style.css";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { plans } from "../../../data/strataPlans/constants";
import { classnames } from "../../../utils/classnames";

export const runtime = "edge";

export default async function Page() {
  return (
    <div className={styles.landingWrapper}>
      <section className={classnames(styles.ctaSection)}>
        <Header className={styles.ctaHeader} priority={2}>
          Take your strata to
          <br />
          all new heights.
        </Header>
        <p className={styles.ctaText}></p>
        <InternalLink className={styles.ctaLink} href="/get-started?plan=basic">
          <Button className={styles.ctaButton}>Begin Onboarding</Button>
        </InternalLink>
      </section>

      <section
        className={classnames(styles.sectionPadded, styles.plansSection)}
      >
        <div className={styles.plansContainer}>
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>
    </div>
  );
}
