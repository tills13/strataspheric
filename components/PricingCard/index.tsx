"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { InternalLink } from "../Link/InternalLink";
import { Money } from "../Money";
import { Panel } from "../Panel";
import { RangeInput } from "../RangeInput";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";

interface Props {
  className?: string;
  features: Array<{ description: string; included: boolean }>;
  planName: string;
  pricePerSeat?: number;
  pricingText?: React.ReactNode;
}

export function PricingCard({
  className,
  features,
  planName,
  pricingText,
  pricePerSeat,
}: Props) {
  const [numSeats, setNumSeats] = useState(10);

  return (
    <Panel className={classnames(styles.pricingCard, className)}>
      <h3 className={styles.pricingCardPlanName}>{planName}</h3>

      <div className={styles.pricingContainer}>
        {pricePerSeat !== undefined && (
          <div className={styles.perSeatPricingSummary}>
            <Money amount={10} /> base + <Money amount={pricePerSeat} /> /
            <span className={styles.estimateSummary}>seat</span>
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

      <InternalLink
        href={`/get-started?plan=${planName.toLowerCase()}&seats=${numSeats}`}
      >
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
