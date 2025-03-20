"use client";

import React, { useEffect, useState } from "react";

import { Session } from "../../auth2/types";

export const SessionCtx = React.createContext<Session | undefined>(undefined);

interface Props {
  session: Session;
}

export function SessionProvider({
  children,
  session: serverSession,
}: React.PropsWithChildren<Props>) {
  const [clientSession, setClientSession] = useState(serverSession);

  useEffect(() => {
    async function refreshSession() {
      const response = await fetch("/api/session/refresh", {
        credentials: "include",
      });
      setClientSession(await response.json());
    }

    refreshSession();
  }, []);

  return (
    <SessionCtx.Provider value={clientSession}>{children}</SessionCtx.Provider>
  );
}
