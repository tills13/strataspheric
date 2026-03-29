"use client";

import { ConfirmButton } from "../../../../components/ConfirmButton";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { CircleCheckIcon } from "../../../../components/Icon/CircleCheckIcon";
import { CircleXIcon } from "../../../../components/Icon/CircleXIcon";
import { InfoPanel } from "../../../../components/InfoPanel";
import { PricingCard } from "../../../../components/PricingCard";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { Text } from "../../../../components/Text";
import {
  FEATURE_AMENITIES,
  FEATURE_DESCRIPTIONS,
  FEATURE_DIRECTORY,
  FEATURE_EMAIL_NOTIFICATIONS,
  FEATURE_INBOX,
  FEATURE_INVOICES,
  FEATURE_MEETINGS,
  PricingPlan,
  plans,
} from "../../../../data/strataPlans/constants";
import { Strata } from "../../../../data/stratas/getStrataById";
import { SubscriptionInvoiceHistory } from "./SubscriptionInvoiceHistory";
import {
  cancelSubscriptionAction,
  changeSubscriptionPlanAction,
  createBillingPortalSessionAction,
  createCheckoutSessionAction,
} from "./actions";

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

type PlanEnableKey =
  | "enableDirectory"
  | "enableMeetings"
  | "enableInvoices"
  | "enableAmenities"
  | "enableEmailNotifications"
  | "enableInbox";

const PLAN_FEATURES: Array<{ label: string; planKey: PlanEnableKey | null }> = [
  {
    label: FEATURE_DESCRIPTIONS[FEATURE_DIRECTORY],
    planKey: "enableDirectory",
  },
  { label: "Files & Events", planKey: null },
  {
    label: FEATURE_DESCRIPTIONS[FEATURE_MEETINGS],
    planKey: "enableMeetings",
  },
  {
    label: FEATURE_DESCRIPTIONS[FEATURE_INVOICES],
    planKey: "enableInvoices",
  },
  {
    label: FEATURE_DESCRIPTIONS[FEATURE_AMENITIES],
    planKey: "enableAmenities",
  },
  {
    label: FEATURE_DESCRIPTIONS[FEATURE_EMAIL_NOTIFICATIONS],
    planKey: "enableEmailNotifications",
  },
  { label: FEATURE_DESCRIPTIONS[FEATURE_INBOX], planKey: "enableInbox" },
];

export interface SerializedSubscription {
  status: string;
  billing_cycle_anchor: number;
  cancel_at_period_end: boolean;
  cancel_at: number | null;
  item: {
    unitAmount: number;
    quantity: number;
    currency: string;
    interval: string | undefined;
  } | null;
}

export interface SerializedInvoice {
  id: string;
  number: string | null;
  created: number | null;
  amount_due: number;
  currency: string;
  status: string | null;
  invoice_pdf: string | null;
}

interface Props {
  subscription: SerializedSubscription | null;
  stripeInvoices: SerializedInvoice[];
  memberCount: number;
  strata: Strata;
  currentPlan: PricingPlan | undefined;
  alternatePlan: PricingPlan | undefined;
}

export function SubscriptionPage({
  subscription,
  stripeInvoices,
  memberCount,
  strata,
  currentPlan,
  alternatePlan,
}: Props) {
  const item = subscription?.item;
  const unitAmount = item?.unitAmount ?? 0;
  const quantity = item?.quantity ?? 1;
  const currency = item?.currency ?? "cad";
  const interval = item?.interval;
  const cancelAtPeriodEnd = subscription?.cancel_at_period_end ?? false;
  const cancelAt = subscription?.cancel_at;

  return (
    <Stack gap="large">
      <Stack gap="normal">
        {subscription ? (
          <Stack gap="small">
            <Text>
              <b>Plan:</b> {currentPlan?.name ?? "Custom"} Plan
            </Text>
            <Text>
              <b>Status:</b>{" "}
              <Text
                as="span"
                color={subscription.status === "active" ? "success" : "error"}
              >
                {subscription.status}
              </Text>
            </Text>
            <Text>
              <b>Members:</b> {memberCount}
            </Text>
            {item && (
              <Text>
                <b>Amount:</b> {formatAmount(unitAmount * quantity, currency)} /{" "}
                {interval}
              </Text>
            )}
            <Text>
              <b>Billing anchor:</b>{" "}
              {formatDate(subscription.billing_cycle_anchor)}
            </Text>
            {cancelAtPeriodEnd && cancelAt && (
              <Text color="error">
                Your subscription is scheduled to cancel on{" "}
                {formatDate(cancelAt)}. Your strata will be deactivated after
                that date.
              </Text>
            )}
          </Stack>
        ) : (
          <Stack gap="normal">
            <Text color="secondary">
              No active subscription. Select a plan to get started.
            </Text>
            <Group gap="small" wrap="wrap">
              {plans
                .filter((plan) => plan.priceId)
                .map((plan) => (
                  <form
                    key={plan.name}
                    action={() =>
                      createCheckoutSessionAction(plan.priceId ?? "")
                    }
                    style={{ flex: "1 1 250px" }}
                  >
                    <button
                      type="submit"
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      <PricingCard compact show="text" {...plan} />
                    </button>
                  </form>
                ))}
            </Group>
          </Stack>
        )}
        {subscription && (
          <form action={createBillingPortalSessionAction}>
            <StatusButton
              color="primary"
              style="secondary"
              type="submit"
              fullWidth
            >
              Manage Billing
            </StatusButton>
          </form>
        )}
      </Stack>

      {subscription && (
        <Stack gap="normal">
          <Header as="h3">Plan Features</Header>
          <Stack gap="small">
            {PLAN_FEATURES.map(({ label, planKey }) => {
              const enabled =
                planKey === null ? true : strata.plan[planKey] === 1;
              return (
                <Text
                  key={label}
                  color={enabled ? "primary" : "secondary"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: enabled ? 1 : 0.4,
                  }}
                >
                  {enabled ? (
                    <CircleCheckIcon fillColor="green500" size="xs" />
                  ) : (
                    <CircleXIcon size="xs" />
                  )}
                  {label}
                </Text>
              );
            })}
          </Stack>
        </Stack>
      )}

      {alternatePlan && alternatePlan.priceId && currentPlan && (
        <InfoPanel
          header={<Header as="h3">Upgrade Plan</Header>}
          level="success"
          action={
            <ConfirmButton
              color="success"
              style="secondary"
              fullWidth
              confirmModalConfirmButtonType="success"
              confirmModalTitle="Change Plan"
              confirmModalDescription={`Switch to the ${alternatePlan.name} Plan. Your subscription will be updated immediately and prorated charges will apply.`}
              onClickConfirm={() =>
                changeSubscriptionPlanAction(alternatePlan.priceId ?? "")
              }
            >
              {currentPlan.name === "Basic"
                ? `Upgrade to ${alternatePlan.name}`
                : `Downgrade to ${alternatePlan.name}`}
            </ConfirmButton>
          }
        >
          <Text>
            Switch to the <b>{alternatePlan.name} Plan</b> at{" "}
            {alternatePlan.pricePerUnit !== undefined
              ? `$${alternatePlan.pricePerUnit}/unit/month`
              : "a custom price"}
            .
          </Text>
          <Stack gap="small">
            {alternatePlan.features.map((feature) => (
              <Text
                key={feature}
                color="secondary"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <CircleCheckIcon fillColor="green500" size="xs" />
                {FEATURE_DESCRIPTIONS[feature]}
              </Text>
            ))}
          </Stack>
        </InfoPanel>
      )}

      {subscription && !cancelAtPeriodEnd && (
        <InfoPanel
          header={<Header as="h3">Cancel Subscription</Header>}
          level="error"
          action={
            <ConfirmButton
              color="error"
              style="secondary"
              confirmModalTitle="Cancel Subscription"
              confirmModalDescription={
                cancelAt
                  ? `Your subscription will remain active until ${formatDate(
                      cancelAt,
                    )}. After that, your strata will be deactivated.`
                  : "Your subscription will remain active until the end of the current billing period. After that, your strata will be deactivated."
              }
              onClickConfirm={cancelSubscriptionAction}
            >
              Cancel Subscription
            </ConfirmButton>
          }
        >
          <Text>
            Cancelling your subscription will deactivate your strata at the end
            of the current billing period.
          </Text>
        </InfoPanel>
      )}

      <Stack gap="normal">
        <Header as="h3">Invoice History</Header>
        <SubscriptionInvoiceHistory invoices={stripeInvoices} />
      </Stack>
    </Stack>
  );
}
