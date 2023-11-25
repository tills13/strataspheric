import { StrataMembership, db } from "..";

interface FindMembersFilters {
  email?: string;
  domain?: string;
  strataId?: string;
  userId?: string;
}

export async function findStrataMemberships(
  opts: FindMembersFilters,
): Promise<StrataMembership[]> {
  let query = db
    .selectFrom("strata_memberships")
    .selectAll("strata_memberships")
    .innerJoin("stratas", "strata_memberships.strataId", "stratas.id")
    .selectAll();

  if (opts.userId) {
    query = query.where("strata_memberships.userId", "=", opts.userId);
  }

  if (opts.strataId) {
    query = query.where("stratas.id", "=", opts.strataId);
  }

  if (opts.domain) {
    query = query.where("stratas.domain", "=", opts.domain);
  }

  if (opts.email) {
    query = query.where("strata_memberships.email", "=", opts.email);
  }

  return query.execute();
}
