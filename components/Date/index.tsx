"use client";

import { parseTimestamp } from "../../utils/datetime";

interface Props {
  className?: string;
  output?: "date" | "time" | "datetime";
  timestamp: number;
}

export function Date({ className, output, timestamp }: Props) {
  let date = parseTimestamp(timestamp);
  let dateStr: string | undefined;

  if (output === "date") {
    dateStr = date.toLocaleDateString();
  } else if (output === "time") {
    dateStr = date.toLocaleTimeString();
  } else {
    dateStr = date.toLocaleString();
  }

  console.log(timestamp, date, dateStr);

  if (!dateStr) {
    return null;
  }

  return (
    <span className={className} suppressHydrationWarning>
      {typeof window === "undefined" ? "" : dateStr}
    </span>
  );
}
