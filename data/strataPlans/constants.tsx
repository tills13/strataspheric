import { InternalLink } from "../../components/Link/InternalLink";

export const plans = [
  {
    name: "Basic",
    features: [
      { description: "unlimited files and events", included: true },
      { description: "strata directory", included: true },
      { description: "per unit pricing", included: true },
      { description: "public or private content", included: true },
      { description: "email notifications", included: false },
      { description: "meetings dashboard & planner", included: false },
      { description: "strata message board", included: false },
    ],
    pricePerUnit: 1,
  },
  {
    name: "Standard",
    features: [
      { description: "unlimited files and events", included: true },
      { description: "strata directory", included: true },
      { description: "per unit pricing", included: true },
      { description: "public or private content", included: true },
      { description: "email notifications", included: true },
      { description: "meetings dashboard & planner", included: true },
      { description: "strata message board", included: true },
    ],
    pricePerUnit: 2,
  },
  {
    name: "Custom",
    features: [
      { description: "unlimited files and events", included: true },
      { description: "strata directory", included: true },
      { description: "fixed pricing", included: true },
      { description: "public or private content", included: true },
      { description: "email notifications", included: true },
      { description: "meetings dashboard & planner", included: true },
      { description: "strata message board", included: true },
    ],
    pricingText: (
      <>
        A plan based on the specific needs of your strata. Please{" "}
        <InternalLink href="/contact">reach out</InternalLink> to us to get
        started.
      </>
    ),
  },
];
