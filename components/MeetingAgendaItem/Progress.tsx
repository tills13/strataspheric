"use client";

import { useEffect, useRef, useState } from "react";

import { ProgressBar } from "../ProgressBar";
import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  doneCount: number;
  stuckClassName?: string;
  totalCount: number;
}

export function MeetingAgendaProgress({
  className,
  doneCount,
  stuckClassName,
  totalCount,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} style={{ height: 0 }} />
      <ProgressBar
        className={classnames(className, stuck && stuckClassName)}
        current={doneCount}
        total={totalCount}
      />
    </>
  );
}
