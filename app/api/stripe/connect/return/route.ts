import { redirect } from "next/navigation";
import Stripe from "stripe";

import { db } from "../../../../../data";
import { updateStrata } from "../../../../../data/stratas/updateStrata";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const strataId = url.searchParams.get("strataId");

  if (!strataId) {
    return new Response("Bad Request", { status: 400 });
  }

  const strata = await db()
    .selectFrom("stratas")
    .select(["id", "stripeAccountId"])
    .where("stratas.id", "=", strataId)
    .executeTakeFirst();

  if (!strata || !strata.stripeAccountId) {
    return new Response("Not Found", { status: 404 });
  }

  const account = await stripe.accounts.retrieve(strata.stripeAccountId);

  if (account.charges_enabled) {
    await updateStrata(strataId, { stripeAccountStatus: "active" });
  }

  redirect("/dashboard/settings");
}
