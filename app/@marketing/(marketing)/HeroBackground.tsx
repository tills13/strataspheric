"use client";

import * as styles from "./style.css";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const parallaxY = scrollY * -0.3;
      ref.current.style.transform = `translate(${mouseX.current}px, ${parallaxY + mouseY.current}px)`;
    }

    function handleScroll() {
      if (!wrapperRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 2500);
      wrapperRef.current.style.opacity = String(opacity);
      update();
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 25;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 20;
      update();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.orbWrapper}>
      <div className={styles.ctaBackground} ref={ref}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.orb4} />
        <div className={styles.orb5} />
        <div className={styles.orb6} />
        <div className={styles.orb7} />
      </div>
    </div>
  );
}
