import { notFound } from "next/navigation";
import Stripe from "stripe";

import { mustAuth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { plans } from "../../../../data/strataPlans/constants";
import { fulfillCheckoutSession } from "../../../../data/strataPlans/fulfillCheckoutSession";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { stripe } from "../../../../data/stripe";
import { can } from "../../../../data/users/permissions";
import { SubscriptionPage } from "./SubscriptionPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const [session, strata, params] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
    searchParams,
  ]);

  if (!can(session.user, "stratas.settings.edit")) {
    notFound();
  }

  // Fulfill checkout session on return from Stripe
  let subscriptionId = strata.plan.subscriptionId;
  if (params.session_id) {
    const fulfilled = await fulfillCheckoutSession(
      params.session_id,
      strata.id,
      strata.plan.subscriptionId,
    );
    if (fulfilled) {
      subscriptionId = fulfilled;
    }
  }

  const [invoicesResult, subscriptionResult, memberships] = await Promise.all([
    stripe.invoices
      .list({ customer: strata.stripeCustomerId, limit: 24 })
      .catch(() => ({ data: [] as Stripe.Invoice[] })),
    subscriptionId
      ? stripe.subscriptions.retrieve(subscriptionId).catch(() => null)
      : Promise.resolve(null),
    listStrataMemberships({ strataId: strata.id }),
  ]);

  const rawInvoices = "data" in invoicesResult ? invoicesResult.data : [];

  const stripeInvoices = rawInvoices.map((inv) => ({
    id: inv.id ?? "",
    number: inv.number ?? null,
    created: inv.created ?? null,
    amount_due: inv.amount_due,
    currency: inv.currency,
    status: inv.status ?? null,
    invoice_pdf: inv.invoice_pdf ?? null,
  }));

  const item = subscriptionResult?.items.data[0];

  const subscription = subscriptionResult
    ? {
        status: subscriptionResult.status,
        billing_cycle_anchor: subscriptionResult.billing_cycle_anchor,
        cancel_at_period_end: subscriptionResult.cancel_at_period_end,
        cancel_at: subscriptionResult.cancel_at,
        item: item
          ? {
              unitAmount: item.price.unit_amount ?? 0,
              quantity: item.quantity ?? 1,
              currency: item.price.currency,
              interval: item.price.recurring?.interval,
            }
          : null,
      }
    : null;

  const productId =
    typeof item?.price.product === "string"
      ? item.price.product
      : item?.price.product?.id;

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
