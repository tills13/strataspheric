import * as styles from "./styles.css";

import { PricingPlan, plans } from "../../data/strataPlans/constants";
import { classnames } from "../../utils/classnames";
import { InternalLink } from "../Link/InternalLink";
import { PricingCard } from "../PricingCard";

interface Props {
  className?: string;
  selectedPlan: PricingPlan;
}

export function PricingPlanSelector({ className, selectedPlan }: Props) {
  return (
    <div className={classnames(styles.pricingPlanSelectorContainer, className)}>
      {plans.map((plan) => (
        <InternalLink
          key={plan.name}
          className={styles.pricingPlanSelectorLink}
          href={"/get-started?plan=" + plan.name.toLowerCase()}
        >
          <PricingCard
            className={classnames(
              styles.pricingPlanSelectorPlan,
              selectedPlan.name === plan.name && styles.activePlan,
            )}
            show="text"
            compact
            {...plan}
          />
        </InternalLink>
      ))}
    </div>
  );
}
