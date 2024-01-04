"use client";

import { parseTimestamp } from "../../utils/datetime";
import { ClientOnly } from "../ClientOnly";

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
      className={className}
      dateTime={parseTimestamp(timestamp).toISOString()}
    >
      <ClientOnly
        fallback={() => formatDate(parseTimestamp(timestamp), output)}
      >
        {() => formatDate(parseTimestamp(timestamp), output)}
      </ClientOnly>
    </time>
  );
}
