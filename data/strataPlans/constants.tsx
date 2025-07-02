import React from "react";

import { InternalLink } from "../../components/Link/InternalLink";

export const FEATURE_PER_UNIT_PRICING = "FEATURE_PER_UNIT_PRICING";
export const FEATURE_FIXED_COST = "FEATURE_FIXED_COST";
export const FEATURE_DIRECTORY = "FEATURE_DIRECTORY";
export const FEATURE_INVOICES = "FEATURE_INVOICES";
export const FEATURE_PUBLIC_PRIVATE_CONTENT = "FEATURE_PUBLIC_PRIVATE_CONTENT";
export const FEATURE_UNLIMITED_FILES_EVENTS = "FEATURE_UNLIMITED_FILES_EVENTS";
export const FEATURE_AMENITIES = "FEATURE_AMENITIES";
export const FEATURE_EMAIL_NOTIFICATIONS = "FEATURE_EMAIL_NOTIFICATIONS";
export const FEATURE_MEETINGS = "FEATURE_MEETINGS";
export const FEATURE_INBOX = "FEATURE_INBOX";

type PricingPlanFeature =
  | typeof FEATURE_PER_UNIT_PRICING
  | typeof FEATURE_FIXED_COST
  | typeof FEATURE_DIRECTORY
  | typeof FEATURE_INVOICES
  | typeof FEATURE_PUBLIC_PRIVATE_CONTENT
  | typeof FEATURE_UNLIMITED_FILES_EVENTS
  | typeof FEATURE_AMENITIES
  | typeof FEATURE_EMAIL_NOTIFICATIONS
  | typeof FEATURE_MEETINGS
  | typeof FEATURE_INBOX;

export const FEATURE_DESCRIPTIONS = {
  [FEATURE_PER_UNIT_PRICING]: "per unit pricing",
  [FEATURE_FIXED_COST]: "fixed pricing",
  [FEATURE_DIRECTORY]: "strata directory",
  [FEATURE_INVOICES]: "invoicing",
  [FEATURE_PUBLIC_PRIVATE_CONTENT]: "public or private content",
  [FEATURE_UNLIMITED_FILES_EVENTS]: "unlimited files & events",
  [FEATURE_AMENITIES]: "amenity bookings and management",
  [FEATURE_INBOX]: "strata inbox",
  [FEATURE_EMAIL_NOTIFICATIONS]: "email notifications",
  [FEATURE_MEETINGS]: "meetings dashboard & planning",
} as const;

export const ALL_OPTIONAL_FEATURES = [
  FEATURE_DIRECTORY,
  FEATURE_UNLIMITED_FILES_EVENTS,
  FEATURE_PUBLIC_PRIVATE_CONTENT,
  FEATURE_AMENITIES,
  FEATURE_INVOICES,
  FEATURE_EMAIL_NOTIFICATIONS,
  FEATURE_MEETINGS,
  FEATURE_INBOX,
] as const;

export interface PricingPlan {
  name: string;
  features: PricingPlanFeature[];
  pricePerUnit?: number;
  pricingHtml?: React.ReactNode;
  pricingText?: React.ReactNode;
  productId?: string;
  priceId?: string;
}

export const plans: PricingPlan[] = [
  {
    name: "Basic",
    features: [
      FEATURE_PER_UNIT_PRICING,
      FEATURE_UNLIMITED_FILES_EVENTS,
      FEATURE_DIRECTORY,
      FEATURE_MEETINGS,
      FEATURE_PUBLIC_PRIVATE_CONTENT,
    ],
    pricePerUnit: 1,
    productId: "prod_SMuIDGsRRHMo0M",
    priceId: "price_1RSAUKH8LacyJce5ZNYn8zK6",
  },
  {
    name: "Standard",
    features: [
      FEATURE_PER_UNIT_PRICING,
      FEATURE_UNLIMITED_FILES_EVENTS,
      FEATURE_DIRECTORY,
      FEATURE_MEETINGS,
      FEATURE_PUBLIC_PRIVATE_CONTENT,
      FEATURE_INVOICES,
      FEATURE_AMENITIES,
      FEATURE_EMAIL_NOTIFICATIONS,
      FEATURE_INBOX,
    ],
    pricePerUnit: 2,
    productId: "prod_SMuK7wvVZo7a6l",
    priceId: "price_1RSAVdH8LacyJce5ckGiJkEP",
  },
  {
    name: "Custom",
    features: [
      FEATURE_FIXED_COST,
      FEATURE_UNLIMITED_FILES_EVENTS,
      FEATURE_DIRECTORY,
      FEATURE_MEETINGS,
      FEATURE_PUBLIC_PRIVATE_CONTENT,
      FEATURE_AMENITIES,
      FEATURE_EMAIL_NOTIFICATIONS,
      FEATURE_INBOX,
    ],
    pricingHtml: (
      <>
        A plan based on the specific needs of your strata. Please{" "}
        <InternalLink href="/contact">reach out</InternalLink> to us to get
        started.
      </>
    ),
    pricingText: "A plan based on the specific needs of your strata.",
  },
];
