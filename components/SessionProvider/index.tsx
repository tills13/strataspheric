"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Session } from "../../auth/types";

export const SessionCtx = React.createContext<Session | undefined>(undefined);
export const RefreshSessionCtx = React.createContext<() => Promise<void>>(
  () => {
    throw new Error("not implemented");
  },
);

interface Props {
  session: Session | undefined;
}

export function SessionProvider({
  children,
  session: serverSession,
}: React.PropsWithChildren<Props>) {
  const [clientSession, setClientSession] = useState(serverSession);
  const refreshSession = useCallback(async () => {
    const response = await fetch("/api/session/refresh", {
      credentials: "include",
    });
    setClientSession(await response.json());
  }, []);

  useEffect(() => {
    if (serverSession) {
      refreshSession();
    }
  }, [refreshSession, serverSession]);

  return (
    <SessionCtx.Provider value={clientSession}>
      <RefreshSessionCtx.Provider value={refreshSession}>
        {children}
      </RefreshSessionCtx.Provider>
    </SessionCtx.Provider>
  );
}
