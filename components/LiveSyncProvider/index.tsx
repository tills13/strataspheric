"use client";

import { useLiveSync } from "../../hooks/useLiveSync";

interface Props {
  children: React.ReactNode;
  enabled?: boolean;
  intervalMs?: number;
}

export function LiveSyncProvider({
  children,
  enabled = true,
  intervalMs = 5000,
}: Props) {
  useLiveSync(intervalMs, enabled);
  return <>{children}</>;
}
