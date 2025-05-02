"use client";

import * as styles from "./style.css";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  timeoutMs?: number;
}

export function Slider({
  children,
  timeoutMs = 5000,
}: React.PropsWithChildren<Props>) {
  const numChildren = React.Children.count(children);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const activeChildRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function nextSlide() {
      setActiveSlideIdx(
        (currentActiveSlideIdx) => (currentActiveSlideIdx + 1) % numChildren,
      );
    }

    const timeout = setTimeout(nextSlide, timeoutMs);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className={styles.slider}>
      <div className={styles.slideContainer}>
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={
              idx === activeSlideIdx ? styles.activeSlide : styles.slide
            }
            ref={idx === activeSlideIdx ? activeChildRef : undefined}
          >
            {child}
          </div>
        ))}
      </div>

      <div className={styles.slideIndicatorContainer}>
        {Array.from(new Array(numChildren)).map((_, idx) => (
          <div
            key={idx}
            className={
              idx === activeSlideIdx
                ? styles.activeSlideIndicator
                : styles.slideIndicator
            }
            onClick={() => setActiveSlideIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
}
