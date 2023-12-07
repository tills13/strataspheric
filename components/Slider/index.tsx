"use client";

import * as styles from "./style.css";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export function Slider({
  children,
  timeout = 5000,
}: React.PropsWithChildren<{}>) {
  const numChildrne = React.Children.count(children);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const activeChildRef = useRef<HTMLDivElement>(null!);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    function nextSlide() {
      setActiveSlideIdx(
        (currentActiveSlideIdx) => (currentActiveSlideIdx + 1) % numChildrne,
      );
    }

    timeoutRef.current = setTimeout(nextSlide, timeout);

    return () => {
      clearTimeout(timeoutRef.current);
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
        {Array.from(new Array(numChildrne)).map((_, idx) => (
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
