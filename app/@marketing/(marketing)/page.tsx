import * as styles from "./style.css";

import { auth } from "../../../auth";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { classnames } from "../../../utils/classnames";

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
          <PricingCard
            features={[
              { description: "unlimited files and events", included: true },
              { description: "strata directory", included: true },
              { description: "per seat pricing", included: true },
              { description: "public or private content", included: false },
              { description: "email notifications", included: false },
              { description: "strata message board", included: false },
            ]}
            planName="Basic"
            pricePerSeat={1}
          />

          <PricingCard
            features={[
              { description: "unlimited files and events", included: true },
              { description: "strata directory", included: true },
              { description: "per seat pricing", included: true },
              { description: "public or private content", included: true },
              { description: "email notifications", included: true },
              { description: "strata message board", included: false },
            ]}
            planName="Standard"
            pricePerSeat={2}
          />

          <PricingCard
            features={[
              { description: "unlimited files and events", included: true },
              { description: "strata directory", included: true },
              { description: "fixed pricing", included: true },
              { description: "public or private content", included: true },
              { description: "email notifications", included: true },
              { description: "strata message board", included: true },
            ]}
            planName="Custom"
            pricingText={
              <>
                A plan based on the specific needs of your strata. Please{" "}
                <InternalLink href="/contact">reach out</InternalLink> to us to
                get started.
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
