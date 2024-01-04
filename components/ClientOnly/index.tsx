"use client";

import React, { useEffect, useState } from "react";

interface Props {
  children: () => React.ReactNode;
  fallback?: React.ReactNode | (() => React.ReactNode);
}

export function ClientOnly({ children, fallback }: Props) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || typeof window === "undefined") {
    return typeof fallback === "function" ? fallback() : fallback;
  }

  return children();
}