"use client";

import * as styles from "./style.css";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { variable } from "../../theme";

export function Slider({
  children,
  timeout = 5000,
}: React.PropsWithChildren<{}>) {
  const numChildrne = React.Children.count(children);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const activeChildRef = useRef<HTMLDivElement>(null!);
  const [activeChildHeight, setActiveChildHeight] = useState<
    string | undefined
  >("271px");

  useLayoutEffect(() => {
    setActiveChildHeight(activeChildRef.current?.clientHeight + "px");
  }, [activeSlideIdx]);

  useEffect(() => {
    let t: any;

    function nextSlide() {
      setActiveSlideIdx(
        (currentActiveSlideIdx) => (currentActiveSlideIdx + 1) % numChildrne,
      );

      t = setTimeout(nextSlide, timeout);
    }

    t = setTimeout(nextSlide, timeout);

    return () => {
      clearTimeout(t);
    };
  }, [numChildrne, timeout]);

  return (
    <div className={styles.slider}>
      <div
        style={{ [variable(styles.activeVar)]: activeChildHeight }}
        className={styles.slideContainer}
      >
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
