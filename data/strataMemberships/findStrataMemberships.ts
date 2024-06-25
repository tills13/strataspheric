import { StrataMembership, db } from "..";

interface FindMembersFilters {
  domain?: string;
  strataId?: string;
  userId?: string;
}

export async function findStrataMemberships(
  opts: FindMembersFilters,
): Promise<Array<StrataMembership & { name: string }>> {
  let query = db
    .selectFrom("strata_memberships")
    .innerJoin("stratas", "strata_memberships.strataId", "stratas.id")
    .innerJoin("users", "strata_memberships.userId", "users.id")
    .selectAll(["strata_memberships"])
    .select("users.name");

  if (opts.userId) {
    query = query.where("strata_memberships.userId", "=", opts.userId);
  }

  if (opts.strataId) {
    query = query.where("stratas.id", "=", opts.strataId);
  }

  if (opts.domain) {
    query = query.where("stratas.domain", "=", opts.domain);
  }

  return query.execute();
}
