"use client";

import React, { useEffect, useState } from "react";

import { Session } from "../../auth/types";

export const SessionCtx = React.createContext<Session | undefined>(undefined);

interface Props {
  session: Session | undefined;
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

    if (serverSession && serverSession.exp > Date.now()) {
      refreshSession();
    }
  }, [serverSession]);

  return (
    <SessionCtx.Provider value={clientSession}>{children}</SessionCtx.Provider>
  );
}
