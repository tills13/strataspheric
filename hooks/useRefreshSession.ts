import { useContext } from "react";

import { RefreshSessionCtx } from "../components/SessionProvider";

export function useRefreshSession() {
  return useContext(RefreshSessionCtx);
}
