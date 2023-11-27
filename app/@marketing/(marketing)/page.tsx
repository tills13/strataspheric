import * as styles from "./style.css";

import { auth } from "../../../auth";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { plans } from "../../../data/strataPlans/constants";
import { classnames } from "../../../utils/classnames";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <section className={classnames(styles.ctaSection)}>
        <Header className={styles.ctaHeader} priority={2}>
          Take your strata to
          <br />
          all new heights.
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
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              features={plan.features}
              planName={plan.name}
              pricePerUnit={plan.pricePerUnit}
              pricingText={plan.pricingText}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
