"use client";

import React from "react";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig>{children}</SWRConfig>;
}
