"use client";

import * as styles from "./style.css";

import differenceInSeconds from "date-fns/differenceInSeconds";
import isSameDay from "date-fns/isSameDay";
import React from "react";

import { classnames } from "../../utils/classnames";
import { parseTimestamp } from "../../utils/datetime";
import { pluralize } from "../../utils/pluralize";
import { ClientOnly } from "../ClientOnly";
import { Bone } from "../Skeleton/Bone";
import { Text } from "../Text";

const SECONDS_IN_ONE_MINUTE = 60;
// const SECONDS_IN_ONE_HOUR = SECONDS_IN_ONE_MINUTE * 60;
// const SECONDS_IN_ONE_DAY = SECONDS_IN_ONE_HOUR * 24;

function formatDate(
  d: Date,
  output: Props["output"],
  compactOutputPrefix?: boolean,
): string {
  if (output === "date") {
    return d.toLocaleDateString();
  } else if (output === "time") {
    return d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  } else if (output === "datetime") {
    return d.toLocaleString();
  } else {
    // compact output
    const now = new window.Date();

    let secondsSince = differenceInSeconds(now, d);
    const mIsSameDay = isSameDay(now, d);

    const isInTheFuture = secondsSince < 0;
    secondsSince = Math.abs(secondsSince);

    // under 10 minutes, return a special time string
    if (secondsSince < SECONDS_IN_ONE_MINUTE) {
      return isInTheFuture ? "now" : "just now";
    } else if (secondsSince < SECONDS_IN_ONE_MINUTE * 10) {
      const minutes = Math.floor(secondsSince / SECONDS_IN_ONE_MINUTE);

      const baseText = `${minutes} ${pluralize("minute", minutes)}`;
      return isInTheFuture ? `in ${baseText}` : `${baseText} ago`;
    }

    // otherwise do something different based on whether it's the same day

    return [
      compactOutputPrefix ? (mIsSameDay ? "at" : "on") : "",
      mIsSameDay ? formatDate(d, "time") : formatDate(d, "date"),
    ]
      .filter(Boolean)
      .join(" ");
  }
}

interface Props extends Omit<React.ComponentProps<typeof Text>, "as"> {
  className?: string;
  compactOutputPrefix?: boolean;
  output?: "date" | "time" | "datetime" | "compact";
  timestamp: number;
}

export function Date({
  className,
  compactOutputPrefix,
  output,
  timestamp,
  ...rest
}: Props) {
  return (
    <Text
      as="time"
      className={classnames(styles.date, className)}
      dateTime={parseTimestamp(timestamp).toISOString()}
      title={parseTimestamp(timestamp).toISOString()}
      {...rest}
    >
      <ClientOnly fallback={() => <Bone className={styles.dateBone} inline />}>
        {() =>
          formatDate(parseTimestamp(timestamp), output, compactOutputPrefix)
        }
      </ClientOnly>
    </Text>
  );
}
