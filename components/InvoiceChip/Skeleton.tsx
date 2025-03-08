import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React from "react";

import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { Bone } from "../Skeleton/Bone";
import { StatusButton } from "../StatusButton";

export function InvoiceChipSkeleton() {
  return (
    <div className={styles.invoiceChip}>
      <Bone className={s({ mb: "normal" })} />
      <Bone className={s({ mb: "normal" })} />

      <div>
        <Bone />

        <StatusButton
          className={styles.markPaidButton}
          color="success"
          iconRight={<CircleCheckIcon />}
          iconTextBehaviour="centerRemainder"
          disabled={true}
          fullWidth={false}
        >
          Mark Paid
        </StatusButton>
      </div>
    </div>
  );
}
