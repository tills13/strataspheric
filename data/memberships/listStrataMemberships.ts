import {
  StrataMembership,
  baseQuery,
  processRows,
} from "./getStrataMembership";

interface FindMembersFilters {
  domain?: string;
  strataId?: string;
  userId?: string;
  includePending?: boolean;
}

export async function listStrataMemberships(
  filter: FindMembersFilters,
): Promise<StrataMembership[]> {
  let query = baseQuery.innerJoin(
    "stratas",
    "stratas.id",
    "strata_memberships.strataId",
  );

  if (filter.userId) {
    query = query.where("strata_memberships.userId", "=", filter.userId);
  }

  if (filter.strataId) {
    query = query.where("stratas.id", "=", filter.strataId);
  }

  if (filter.domain) {
    query = query.where("stratas.domain", "=", filter.domain);
  }

  if (!filter.includePending) {
    query = query.where("strata_memberships.role", "!=", "pending");
  }

  return processRows(...(await query.execute()));
}
