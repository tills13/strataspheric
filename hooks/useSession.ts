import { useContext } from "react";

import { SessionCtx } from "../components/SessionProvider";

export function useSession() {
  return useContext(SessionCtx);
}
