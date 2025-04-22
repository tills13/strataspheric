import * as styles from "./style.css";

import { PageProps } from "../../../.next/types/app/@marketing/get-started/page";
import { auth } from "../../../auth";
import { GetStartedForm } from "../../../components/GetStarted/Form";
// import { PricingPlanSelector } from "../../../components/PricingPlanSelector";
import { plans } from "../../../data/strataPlans/constants";
import { StaticPageContainer } from "../StaticPageContainer";
import { submitGetStarted } from "./actions";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  const { plan: planName } = await searchParams;

  let plan = plans.find((plan) => plan.name.toLowerCase() === planName);

  if (!plan) {
    plan = plans[0];
  }

  return (
    <StaticPageContainer>
      <div>
        {/* <PricingPlanSelector
          className={styles.pricingPlanSelector}
          selectedPlan={plan}
        /> */}
        <GetStartedForm
          className={styles.getStartedForm}
          selectedPlan={plan}
          submitGetStarted={submitGetStarted}
        />
      </div>
    </StaticPageContainer>
  );
}
