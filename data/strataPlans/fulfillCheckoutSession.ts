import { stripe } from "../stripe";
import {
  FEATURE_AMENITIES,
  FEATURE_DIRECTORY,
  FEATURE_EMAIL_NOTIFICATIONS,
  FEATURE_INBOX,
  FEATURE_INVOICES,
  FEATURE_MEETINGS,
  plans,
} from "./constants";
import { updateStrataPlan } from "./updateStrataPlan";

/**
 * Retrieves a Stripe checkout session and saves the subscription ID
 * and feature flags to the strata plan. Idempotent — skips if the
 * subscription is already saved.
 */
export async function fulfillCheckoutSession(
  sessionId: string,
  strataId: string,
  currentSubscriptionId: string,
) {
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  if (
    checkoutSession.mode !== "subscription" ||
    !checkoutSession.subscription
  ) {
    return;
  }

  const subscriptionId =
    typeof checkoutSession.subscription === "string"
      ? checkoutSession.subscription
      : checkoutSession.subscription.id;

  // Already saved
  if (currentSubscriptionId === subscriptionId) {
    return subscriptionId;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  const priceId = lineItems.data[0]?.price?.id;
  const matchedPlan = priceId
    ? plans.find((p) => p.priceId === priceId)
    : undefined;

  await updateStrataPlan(strataId, {
    subscriptionId,
    ...(matchedPlan && {
      enableDirectory: matchedPlan.features.includes(FEATURE_DIRECTORY) ? 1 : 0,
      enableMeetings: matchedPlan.features.includes(FEATURE_MEETINGS) ? 1 : 0,
      enableInvoices: matchedPlan.features.includes(FEATURE_INVOICES) ? 1 : 0,
      enableAmenities: matchedPlan.features.includes(FEATURE_AMENITIES) ? 1 : 0,
      enableEmailNotifications: matchedPlan.features.includes(
        FEATURE_EMAIL_NOTIFICATIONS,
      )
        ? 1
        : 0,
      enableInbox: matchedPlan.features.includes(FEATURE_INBOX) ? 1 : 0,
    }),
  });

  return subscriptionId;
}
