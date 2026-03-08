"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";

import { auth } from "../../../../auth";
import { deleteRecord } from "../../../../cloudflare/dns/deleteRecord";
import { removeCustomDomain } from "../../../../cloudflare/pages/removeCustomDomain";
import { protocol, tld } from "../../../../constants";
import { deleteAllEvents } from "../../../../data/events/deleteAllEvents";
import { deleteAllFiles } from "../../../../data/files/deleteAllFiles";
import { listFiles } from "../../../../data/files/listFiles";
import { deleteAllThreadChats } from "../../../../data/inbox/deleteAllThreadChats";
import { deleteAllThreads } from "../../../../data/inbox/deleteAllThreads";
import { deleteAllMeetings } from "../../../../data/meetings/deleteAllMeetings";
import { deleteAllStrataMemberships } from "../../../../data/memberships/deleteAllStrataMemberships";
import { r2 } from "../../../../data/r2";
import { deleteStrata } from "../../../../data/stratas/deleteStrata";
import {
  getCurrentStrata,
  mustGetCurrentStrata,
} from "../../../../data/stratas/getStrataByDomain";
import { updateStrata } from "../../../../data/stratas/updateStrata";
import { can } from "../../../../data/users/permissions";
import { deleteAllWidgets } from "../../../../data/widgets/deleteAllWidgets";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const NotAuthorized = new Error("not authorized");

export async function deleteStrataAction() {
  const currentStrata = await getCurrentStrata();
  const session = await auth();

  if (!currentStrata || !can(session?.user, "stratas.settings.edit")) {
    throw NotAuthorized;
  }

  const files = await listFiles({ strataId: currentStrata.id });

  if (files.length !== 0) {
    await r2().delete(files.map((file) => file.path));
  }

  // await deleteAllEmails();
  await deleteAllEvents(currentStrata.id);
  await deleteAllFiles(currentStrata.id);
  await deleteAllThreadChats(currentStrata.id);
  await deleteAllThreads(currentStrata.id);
  await deleteAllMeetings(currentStrata.id);
  await deleteAllWidgets(currentStrata.id);
  await deleteStrata(currentStrata.id);
  await deleteAllStrataMemberships(currentStrata.id);

  if (process.env.NODE_ENV !== "development") {
    await removeCustomDomain(currentStrata.domain);
    await deleteRecord(currentStrata.domainRecordId);
  }

  redirect(`${protocol}//${tld}`);
}

export async function createStripeConnectAccountAction() {
  const session = await auth();

  if (!can(session?.user, "stratas.settings.edit")) {
    throw NotAuthorized;
  }

  const strata = await mustGetCurrentStrata();

  const returnUrl = `${protocol}//${strata.domain}/api/stripe/connect/return?strataId=${strata.id}`;
  const refreshUrl = `${protocol}//${strata.domain}/dashboard/settings`;

  let accountId = strata.stripeAccountId;

  if (!accountId) {
    const account = await stripe.accounts.create({ type: "express" });
    accountId = account.id;
    await updateStrata(strata.id, {
      stripeAccountId: accountId,
      stripeAccountStatus: "pending",
    });
  }

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: "account_onboarding",
  });

  redirect(accountLink.url);
}

export async function createStripeConnectDashboardLinkAction() {
  const session = await auth();

  if (!can(session?.user, "stratas.settings.view")) {
    throw NotAuthorized;
  }

  const strata = await mustGetCurrentStrata();

  if (!strata.stripeAccountId) {
    redirect("/dashboard/settings");
  }

  const loginLink = await stripe.accounts.createLoginLink(
    strata.stripeAccountId,
  );
  redirect(loginLink.url);
}
