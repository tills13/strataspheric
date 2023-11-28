import * as styles from "./style.css";

import { PricingCard } from "../../../../../components/PricingCard";
import { plans } from "../../../../../data/strataPlans/constants";

export const runtime = "edge";

export default function Page() {
  return (
    <div>
      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </div>
  );
}
