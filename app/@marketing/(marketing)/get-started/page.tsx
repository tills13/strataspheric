import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { GetStartedForm } from "../../../../components/GetStarted/Form";
import { PricingPlanSelector } from "../../../../components/PricingPlanSelector";
import { plans } from "../../../../data/strataPlans/constants";
import { submitGetStarted } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const session = await auth();

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
        session={session}
        selectedPlan={plan}
        submitGetStarted={submitGetStarted}
      />
    </>
  );
}
