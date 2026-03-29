import { baseQuery, processRows } from "./getStrataMembership";

interface FindMembersFilters {
  domain?: string;
  strataId?: string;
  userId?: string;
  includePending?: boolean;
  pendingOnly?: boolean;
}

export async function listStrataMemberships(filter: FindMembersFilters) {
  let query = baseQuery()
    .innerJoin("stratas", "stratas.id", "strata_memberships.strataId")
    .select("stratas.name as strataName");

  if (filter.userId) {
    query = query.where("strata_memberships.userId", "=", filter.userId);
  }

  if (filter.strataId) {
    query = query.where("stratas.id", "=", filter.strataId);
  }

  if (filter.domain) {
    query = query.where("stratas.domain", "=", filter.domain);
  }

  if (filter.pendingOnly) {
    query = query.where("strata_memberships.role", "=", "pending");
  } else if (!filter.includePending) {
    query = query.where("strata_memberships.role", "!=", "pending");
  }

  const rows = await query.execute();
  const processed = processRows(...rows);
  return processed.map((membership, i) => ({
    ...membership,
    strataName: rows[i]!.strataName,
  }));
}
