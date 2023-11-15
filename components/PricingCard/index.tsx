"use client";

import { useState } from "react";
import { classnames } from "../../utils/classnames";
import * as styles from "./style.css";
import { pluralize } from "../../utils/pluralize";
import { Button } from "../Button";
import { InternalLink } from "../Link/InternalLink";
import { Money } from "../Money";

interface Props {
  className?: string;
  planName: string;
}

export function PricingCard({ className, planName }: Props) {
  const [numSeats, setNumSeats] = useState(10);

  return (
    <div className={classnames(styles.pricingCard, className)}>
      <h3 className={styles.pricingCardPlanName}>{planName}</h3>

      <h4>Features</h4>
      <div>
        <ul className={styles.planDetailsList}>
          <li>unlimited files and events</li>
          <li>strata directory</li>
          <li>public or private content</li>
          <li>per seat pricing</li>
        </ul>
      </div>

      <h4>Fee Structure</h4>

      <div className={styles.feeStructureContainer}>
        <Money amount={10} /> base + <Money amount={1} /> /
        <span className={styles.estimateSummary}>seat</span>
      </div>

      <div className={styles.numSeatsField}>
        1
        <input
          className={styles.numSeatsInput}
          type="range"
          min={1}
          max={101}
          onChange={(e) => setNumSeats(parseInt(e.target.value, 10))}
          value={numSeats}
        />
        100
      </div>

      <div className={styles.estimateContainer}>
        <div className={styles.estimateSummary}>
          <span className={styles.estimateSummarySeats}>{numSeats}</span>{" "}
          {pluralize("Seat", numSeats)}
        </div>

        <div>
          <Money amount={10 + numSeats * 1} />
          <span className={styles.estimatePeriod}>per month</span>
        </div>
      </div>

      <InternalLink href={`/get-started?plan=basic&seats=${numSeats}`}>
        <Button
          className={styles.selectPlanButton}
          variant="primary"
          size="large"
        >
          Select Plan
        </Button>
      </InternalLink>
    </div>
  );
}
