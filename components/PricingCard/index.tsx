"use client";

import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
import { InternalLink } from "../Link/InternalLink";
import { Money } from "../Money";
import { Panel } from "../Panel";

interface Props {
  className?: string;
  features: Array<{ description: string; included: boolean }>;
  planName: string;
  pricePerUnit?: number;
  pricingText?: React.ReactNode;
}

export function PricingCard({
  className,
  features,
  planName,
  pricingText,
  pricePerUnit,
}: Props) {
  return (
    <Panel className={classnames(styles.pricingCard, className)}>
      <h3 className={styles.pricingCardPlanName}>{planName}</h3>

      <div className={styles.pricingContainer}>
        {pricePerUnit !== undefined && (
          <div className={styles.perSeatPricingSummary}>
            <Money amount={pricePerUnit} /> /
            <span className={styles.estimateSummary}>unit</span>
          </div>
        )}
        {pricingText}
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

      <InternalLink href={`/get-started?plan=${planName.toLowerCase()}`}>
        <Button
          className={styles.selectPlanButton}
          variant="primary"
          size="large"
        >
          Select Plan
        </Button>
      </InternalLink>
    </Panel>
  );
}
