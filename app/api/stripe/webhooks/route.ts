import Stripe from "stripe";

import { db } from "../../../../data";
import { getInvoiceByStripeInvoiceId } from "../../../../data/invoices/getInvoiceByStripeInvoiceId";
import { updateInvoice } from "../../../../data/invoices/updateInvoice";
import { fulfillCheckoutSession } from "../../../../data/strataPlans/fulfillCheckoutSession";
import { stripe } from "../../../../data/stripe";
import { updateStrata } from "../../../../data/stratas/updateStrata";

async function handlePlatformEvent(event: Stripe.Event) {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode !== "subscription" || !session.subscription) return;

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;

    if (!customerId) return;

    const strata = await db()
      .selectFrom("stratas")
      .innerJoin("strata_plans", "stratas.id", "strata_plans.strataId")
      .select(["stratas.id", "strata_plans.subscriptionId"])
      .where("stratas.stripeCustomerId", "=", customerId)
      .executeTakeFirst();

    if (!strata) return;

    await fulfillCheckoutSession(session.id, strata.id, strata.subscriptionId);
  } else if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    const strata = await db()
      .selectFrom("stratas")
      .select("id")
      .where("stratas.stripeCustomerId", "=", customerId)
      .executeTakeFirst();

    if (strata) {
      await updateStrata(strata.id, { status: "inactive" });
    }
  } else if (event.type === "invoice.payment_failed") {
    console.log("[stripe] platform invoice.payment_failed", event.id);
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.account) {
    // Connect event — strata invoice payment
    if (event.type === "invoice.paid") {
      const stripeInvoice = event.data.object as Stripe.Invoice;
      if (!stripeInvoice.id) return new Response("OK");
      const invoice = await getInvoiceByStripeInvoiceId(stripeInvoice.id);
      if (invoice) {
        await updateInvoice(invoice.id, {
          isPaid: 1,
          updatedAt: Date.now(),
        });
      }
    }
  } else {
    await handlePlatformEvent(event);
  }

  return new Response("OK");
}
