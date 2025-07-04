"use client";

import * as styles from "./style.css";

import React from "react";

import {
  ALL_OPTIONAL_FEATURES,
  FEATURE_DESCRIPTIONS,
  PricingPlan,
} from "../../data/strataPlans/constants";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
import { RightIcon } from "../Icon/RightIcon";
import { InternalLink } from "../Link/InternalLink";
import { Money } from "../Money";
import { Panel } from "../Panel";

interface Props extends PricingPlan {
  className?: string;
  show?: "text" | "html";
  compact?: boolean;
}

export function PricingCard({
  className,
  compact,
  features,
  name,
  pricingHtml,
  pricingText,
  pricePerUnit,
  show = "html",
}: Props) {
  if (compact) {
    return (
      <Panel className={classnames(styles.pricingCard, className)}>
        <h3 className={styles.pricingCardPlanName}>{name}</h3>

        <div className={styles.compactPricingContainer}>
          {pricePerUnit !== undefined && (
            <div className={styles.perSeatPricingSummary}>
              <Money amount={pricePerUnit} /> / <span>unit</span> /{" "}
              <span>month</span>
            </div>
          )}
          {show === "text" ? pricingText : pricingHtml}
        </div>
      </Panel>
    );
  }

  return (
    <Panel className={classnames(styles.pricingCard, className)}>
      <h3 className={styles.pricingCardPlanName}>{name}</h3>

      <div className={styles.pricingContainer}>
        {pricePerUnit !== undefined && (
          <div className={styles.perSeatPricingSummary}>
            <Money amount={pricePerUnit} /> / <span>unit</span> /{" "}
            <span>month</span>
          </div>
        )}
        {show === "text" ? pricingText : pricingHtml}
      </div>

      <div className={styles.featuresSection}>
        <h4 className={styles.planFeaturesListHeader}>Features</h4>
        <ul className={styles.planFeaturesList}>
          {ALL_OPTIONAL_FEATURES.map((optionalFeature, idx) => (
            <li
              key={idx}
              className={
                features.includes(optionalFeature)
                  ? styles.planFeaturesIncludedFeature
                  : styles.planFeaturesFeature
              }
            >
              {features.includes(optionalFeature) ? (
                <CircleCheckIcon
                  className={styles.planFeaturesFeatureIconIncluded}
                />
              ) : (
                <CircleXIcon className={styles.planFeaturesFeatureIcon} />
              )}
              {FEATURE_DESCRIPTIONS[optionalFeature]}
            </li>
          ))}
        </ul>
      </div>

      <InternalLink
        className={styles.selectPlanButtonLink}
        href={`/get-started?plan=${name.toLowerCase()}`}
      >
        <Button color="primary" icon={<RightIcon />} fullWidth>
          Select Plan
        </Button>
      </InternalLink>
    </Panel>
  );
}
