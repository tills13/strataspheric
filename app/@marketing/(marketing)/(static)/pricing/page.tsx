import * as styles from "./style.css";

import { InternalLink } from "../../../../../components/Link/InternalLink";
import { PricingCard } from "../../../../../components/PricingCard";

export const runtime = "edge";

export default function Page() {
  return (
    <div>
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
    </div>
  );
}
