"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const IDLE_TIMEOUT = 10_000;

/**
 * Polls for updates by calling `router.refresh()` at a given interval,
 * but only while the user is active (mouse movement within the last 10s).
 *
 * Reusable for any page that needs near-real-time updates:
 * - Meeting agendas (multiple participants editing simultaneously)
 * - Inbox thread chats (live conversation view)
 * - Dashboard widgets (activity feeds, notifications)
 *
 * @param intervalMs - Polling interval in milliseconds (default: 5000)
 * @param enabled - Whether polling is active (default: true)
 */
export function useLiveSync(intervalMs: number = 5000, enabled: boolean = true) {
  const router = useRouter();
  const lastActivityRef = useRef(Date.now());

  const onActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("touchstart", onActivity);

    const id = setInterval(() => {
      if (Date.now() - lastActivityRef.current < IDLE_TIMEOUT) {
        router.refresh();
      }
    }, intervalMs);

    return () => {
      clearInterval(id);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
    };
  }, [router, intervalMs, enabled, onActivity]);
}
