import { cache } from "react";

import { listStrataMemberships } from "./listStrataMemberships";

export const getStrataMembershipByDomainAndUserId = cache(
  async (domain: string, userId: string) => {
    const [membership] = await listStrataMemberships({ domain, userId });
    return membership;
  },
);
