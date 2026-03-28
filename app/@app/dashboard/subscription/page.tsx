import { notFound } from "next/navigation";
import Stripe from "stripe";

import { mustAuth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { plans } from "../../../../data/strataPlans/constants";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { stripe } from "../../../../data/stripe";
import { can } from "../../../../data/users/permissions";
import { SubscriptionPage } from "./SubscriptionPage";

export default async function Page() {
  const [session, strata] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
  ]);

  if (!can(session.user, "stratas.settings.edit")) {
    notFound();
  }

  const [invoicesResult, subscriptionResult, memberships] = await Promise.all([
    stripe.invoices
      .list({ customer: strata.stripeCustomerId, limit: 24 })
      .catch(() => ({ data: [] as Stripe.Invoice[] })),
    stripe.subscriptions.retrieve(strata.plan.subscriptionId).catch(() => null),
    listStrataMemberships({ strataId: strata.id }),
  ]);

  const stripeInvoices = "data" in invoicesResult ? invoicesResult.data : [];
  const subscription = subscriptionResult;

  const productId =
    typeof subscription?.items.data[0]?.price.product === "string"
      ? subscription.items.data[0].price.product
      : subscription?.items.data[0]?.price.product?.id;

  const currentPlan = plans.find((p) => p.productId === productId);
  const alternatePlan =
    currentPlan?.name === "Basic"
      ? plans.find((p) => p.name === "Standard")
      : currentPlan?.name === "Standard"
        ? plans.find((p) => p.name === "Basic")
        : undefined;

  return (
    <DashboardLayout title="Subscription">
      <SubscriptionPage
        subscription={subscription}
        stripeInvoices={stripeInvoices}
        memberCount={memberships.length}
        strata={strata}
        currentPlan={currentPlan}
        alternatePlan={alternatePlan}
      />
    </DashboardLayout>
  );
}
