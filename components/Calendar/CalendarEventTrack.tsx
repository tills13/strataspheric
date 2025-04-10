"use client";

import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function CalendarEventTrack({ children }: Props) {
  const [clientWidth, setClientWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    setClientWidth(ref.current.clientWidth);
  });

  return (
    <div
      className={styles.calendarEventTrack}
      ref={ref}
      style={assignInlineVars({
        [styles.calendarEventTrackWidth]: `${clientWidth}px`,
      })}
    >
      {children}
    </div>
  );
}
