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
    function updateClientWidth() {
      setClientWidth(ref.current.clientWidth);
    }

    window.addEventListener("resize", updateClientWidth);
    updateClientWidth();

    return () => {
      window.removeEventListener("resize", updateClientWidth);
    };
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
