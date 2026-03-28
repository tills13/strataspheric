"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { protocol } from "../../../../constants";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import {
  FEATURE_AMENITIES,
  FEATURE_DIRECTORY,
  FEATURE_EMAIL_NOTIFICATIONS,
  FEATURE_INBOX,
  FEATURE_INVOICES,
  FEATURE_MEETINGS,
  plans,
} from "../../../../data/strataPlans/constants";
import { updateStrataPlan } from "../../../../data/strataPlans/updateStrataPlan";
import { stripe } from "../../../../data/stripe";
import { can } from "../../../../data/users/permissions";

const NotAuthorized = new Error("not authorized");

export async function createBillingPortalSessionAction() {
  const session = await auth();

  if (!can(session?.user, "stratas.settings.edit")) {
    throw NotAuthorized;
  }

  const strata = await mustGetCurrentStrata();

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: strata.stripeCustomerId,
    return_url: `${protocol}//${strata.domain}/dashboard/subscription`,
  });

  redirect(portalSession.url);
}

export async function cancelSubscriptionAction() {
  const session = await auth();

  if (!can(session?.user, "stratas.settings.edit")) {
    throw NotAuthorized;
  }

  const strata = await mustGetCurrentStrata();

  await stripe.subscriptions.update(strata.plan.subscriptionId, {
    cancel_at_period_end: true,
  });

  revalidatePath("/dashboard/subscription");
}

export async function changeSubscriptionPlanAction(newPriceId: string) {
  const session = await auth();

  if (!can(session?.user, "stratas.settings.edit")) {
    throw NotAuthorized;
  }

  const strata = await mustGetCurrentStrata();

  const subscription = await stripe.subscriptions.retrieve(
    strata.plan.subscriptionId,
  );

  const itemId = subscription.items.data[0]?.id;
  if (!itemId) {
    throw new Error("No subscription item found");
  }

  await stripe.subscriptions.update(strata.plan.subscriptionId, {
    items: [{ id: itemId, price: newPriceId }],
    proration_behavior: "create_prorations",
  });

  const newPlan = plans.find((p) => p.priceId === newPriceId);
  if (newPlan) {
    await updateStrataPlan(strata.id, {
      enableDirectory: newPlan.features.includes(FEATURE_DIRECTORY) ? 1 : 0,
      enableMeetings: newPlan.features.includes(FEATURE_MEETINGS) ? 1 : 0,
      enableInvoices: newPlan.features.includes(FEATURE_INVOICES) ? 1 : 0,
      enableAmenities: newPlan.features.includes(FEATURE_AMENITIES) ? 1 : 0,
      enableEmailNotifications: newPlan.features.includes(
        FEATURE_EMAIL_NOTIFICATIONS,
      )
        ? 1
        : 0,
      enableInbox: newPlan.features.includes(FEATURE_INBOX) ? 1 : 0,
    });
  }

  revalidatePath("/dashboard/subscription");
}
