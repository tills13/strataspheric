"use client";

import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { parseTimestamp } from "../../utils/datetime";
import { ClientOnly } from "../ClientOnly";
import { Bone } from "../Skeleton/Bone";

function formatDate(d: Date, output: Props["output"]) {
  if (output === "date") {
    return d.toLocaleDateString();
  } else if (output === "time") {
    return d.toLocaleTimeString();
  } else {
    return d.toLocaleString();
  }
}

interface Props {
  className?: string;
  output?: "date" | "time" | "datetime";
  timestamp: number;
}

export function Date({ className, output, timestamp }: Props) {
  return (
    <time
      className={classnames(styles.date, className)}
      dateTime={parseTimestamp(timestamp).toISOString()}
    >
      <ClientOnly fallback={() => <Bone className={styles.dateBone} inline />}>
        {() => formatDate(parseTimestamp(timestamp), output)}
      </ClientOnly>
    </time>
  );
}
