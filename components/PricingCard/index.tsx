"use client";

import * as styles from "./style.css";

import React from "react";

import { PricingPlan } from "../../data/strataPlans/constants";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
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
              <Money amount={pricePerUnit} /> /
              <span className={styles.estimateSummary}>unit</span>
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
            <Money amount={pricePerUnit} /> /
            <span className={styles.estimateSummary}>unit</span>
          </div>
        )}
        {show === "text" ? pricingText : pricingHtml}
      </div>

      <div className={styles.featuresSection}>
        <h4 className={styles.planFeaturesListHeader}>Features</h4>
        <ul className={styles.planFeaturesList}>
          {features.map(({ description, included }, idx) => (
            <li
              key={idx}
              className={classnames(
                styles.planFeaturesFeature,
                included && styles.planFeaturesIncludedFeature,
              )}
            >
              {included ? (
                <CircleCheckIcon
                  className={styles.planFeaturesFeatureIconIncluded}
                />
              ) : (
                <CircleXIcon className={styles.planFeaturesFeatureIcon} />
              )}
              {description}
            </li>
          ))}
        </ul>
      </div>

      <InternalLink
        className={styles.selectPlanButtonLink}
        href={`/get-started?plan=${name.toLowerCase()}`}
      >
        <Button className={styles.selectPlanButton}>Select Plan</Button>
      </InternalLink>
    </Panel>
  );
}
