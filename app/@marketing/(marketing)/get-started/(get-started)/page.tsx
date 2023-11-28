import * as styles from "./style.css";

import { GetStartedForm } from "../../../../../components/GetStarted/Form";
import { PricingPlanSelector } from "../../../../../components/PricingPlanSelector";
import { plans } from "../../../../../data/strataPlans/constants";
import { submitGetStarted } from "./actions";

export const runtime = "edge";

export default function Page({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  let plan = plans.find(
    (plan) => plan.name.toLowerCase() === searchParams.plan,
  );

  if (!plan) {
    plan = plans[0];
  }

  return (
    <>
      <PricingPlanSelector
        className={styles.pricingPlanSelector}
        selectedPlan={plan}
      />
      <GetStartedForm
        className={styles.getStartedForm}
        selectedPlan={plan}
        submitGetStarted={submitGetStarted}
      />
    </>
  );
}
