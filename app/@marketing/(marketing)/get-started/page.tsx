import { Flex } from "../../../../components/Flex";
import { GetStartedFormFields } from "../../../../components/GetStarted/Fields";
import { GetStartedForm } from "../../../../components/GetStarted/Form";
import { PricingPlanSelector } from "../../../../components/PricingPlanSelector";
import { Stack } from "../../../../components/Stack";
import { plans } from "../../../../data/strataPlans/constants";
import { StaticPageContainer } from "../StaticPageContainer";

export default async function Page({
  searchParams,
}: PageProps<"/get-started">) {
  const { plan: planName } = await searchParams;

  let plan = plans.find((plan) => plan.name.toLowerCase() === planName);

  if (!plan) {
    plan = plans[0];
  }

  return (
    <StaticPageContainer>
      <GetStartedForm>
        <Flex from="desktop">
          <PricingPlanSelector selectedPlan={plan} />
          <Stack flex={1}>
            <GetStartedFormFields selectedPlan={plan} />
          </Stack>
        </Flex>
      </GetStartedForm>
    </StaticPageContainer>
  );
}
