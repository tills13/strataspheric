"use server";

import Stripe from "stripe";

import { auth } from "../../../auth";
import { CF_PAGES_PROJECT_ID } from "../../../cloudflare/constants";
import { createRecord } from "../../../cloudflare/dns/createRecord";
import { addCustomDomain } from "../../../cloudflare/pages/addCustomDomain";
import { createStrataMembership } from "../../../data/memberships/createStrataMembership";
import {
  FEATURE_AMENITIES,
  FEATURE_DIRECTORY,
  FEATURE_EMAIL_NOTIFICATIONS,
  FEATURE_INBOX,
  FEATURE_INVOICES,
  FEATURE_MEETINGS,
  plans,
} from "../../../data/strataPlans/constants";
import { createPlan } from "../../../data/strataPlans/createStrataPlan";
import { createStrata } from "../../../data/stratas/createStrata";
import { updateStrata } from "../../../data/stratas/updateStrata";
import { createUser } from "../../../data/users/createUser";
import * as formdata from "../../../utils/formdata";
import { GetStartedFormStep } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function submitGetStartedAction(
  state: GetStartedFormStep,
  fd: FormData,
): Promise<GetStartedFormStep> {
  const session = await auth();

  if (state.step === "CREATE_ACCOUNT") {
    if (session) {
      return { step: "CREATE_STRATA", lastStep: state.step };
    }

    const name = formdata.getString(fd, "name");
    const email = formdata.getString(fd, "email");
    const password = formdata.getString(fd, "password");
    const confirmPassword = formdata.getString(fd, "confirmPassword");

    if (name === "" || email === "" || password === "") {
      return { ...state, error: "missing or invalid fields" };
    }

    if (password !== confirmPassword) {
      return { ...state, error: "passwords do not match" };
    }

    await createUser({
      accountType: "user",
      name,
      email,
      password,
      status: "active",
    });

    return { step: "CREATE_STRATA", lastStep: state.step };
  } else if (state.step === "CREATE_STRATA") {
    if (!session) {
      return { step: "CREATE_ACCOUNT", lastStep: state.step };
    }

    const strataName = formdata.getString(fd, "strata_name");
    const strataMainContact = formdata.getString(fd, "strata_main_contact");
    const strataDomain = formdata.getString(fd, "strata_domain");
    const isPublic =
      formdata.getEnum(fd, "is_public", ["public", "private"]) === "public";
    const numUnits = formdata.getInteger(fd, "num_units");

    if (strataName === "" || strataDomain === "" || isNaN(numUnits)) {
      return { ...state, error: "missing or invalid fields" };
    }

    const stripeCustomer = await stripe.customers.create({
      name: strataName,
      email: strataMainContact,
    });

    const { id: strataId } = await createStrata({
      domain: strataDomain,
      domainRecordId: "",
      name: strataName,
      numUnits,
      isPublic: isPublic ? 1 : 0,
      stripeCustomerId: stripeCustomer.id,
    });

    await createStrataMembership({
      strataId,
      userId: session.user.id,
      role: "administrator",
    });

    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
    });

    if (!setupIntent.client_secret) {
      return { ...state, error: "failed to create setup intent" };
    }

    return {
      step: "SUBMIT_PAYMENT",
      stripeSetupIntentId: setupIntent.id,
      stripeClientSecret: setupIntent.client_secret,
      strataId,
      strataDomain,
      stripeCustomerId: stripeCustomer.id,
      numUnits,
      lastStep: state.step,
    };
  } else if (state.step === "SUBMIT_PAYMENT") {
    const planName = formdata.getString(fd, "planName");
    const plan = plans.find((plan) => plan.name.toLowerCase() === planName);

    if (!plan) {
      return { ...state, error: "failed to find plan" };
    }

    const setupIntentResult = await stripe.setupIntents.retrieve(
      state.stripeSetupIntentId,
    );

    const paymentMethodId =
      typeof setupIntentResult.payment_method === "string"
        ? setupIntentResult.payment_method
        : setupIntentResult.payment_method?.id;

    const subscription = await stripe.subscriptions.create({
      default_payment_method: paymentMethodId,
      customer: state.stripeCustomerId,
      items: [{ price: plan.priceId, quantity: state.numUnits }],
    });

    await createPlan({
      enableInbox: plan.features.includes(FEATURE_INBOX) ? 1 : 0,
      enableInvoices: plan.features.includes(FEATURE_INVOICES) ? 1 : 0,
      enableAmenities: plan.features.includes(FEATURE_AMENITIES) ? 1 : 0,
      enableDirectory: plan.features.includes(FEATURE_DIRECTORY) ? 1 : 0,
      enableEmailNotifications: plan.features.includes(
        FEATURE_EMAIL_NOTIFICATIONS,
      )
        ? 1
        : 0,
      enableMeetings: plan.features.includes(FEATURE_MEETINGS) ? 1 : 0,
      strataId: state.strataId,
      subscriptionId: subscription.id,
    });

    if (process.env.NODE_ENV !== "development") {
      const [createDnsRecordResponse] = await createRecord(
        "CNAME",
        state.strataDomain,
        CF_PAGES_PROJECT_ID + ".pages.dev",
      );

      if (!createDnsRecordResponse.success) {
        return {
          ...state,
          error: "unable to create DNS record",
        };
      }

      await updateStrata(state.strataId, {
        domainRecordId: createDnsRecordResponse.result.id,
      });

      const [rJson] = await addCustomDomain(state.strataDomain);

      if (!rJson.success) {
        return {
          ...state,
          error: "unable to create custom domain",
        };
      }
    }

    return { step: "SUCCESS", redirect: "/get-started/" + state.strataDomain };
  }

  return state;
}
