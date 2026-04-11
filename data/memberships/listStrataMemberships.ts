import { db } from "..";
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
  const membershipIds = rows.map((r) => r.membershipId);

  const occupantUnits =
    membershipIds.length > 0
      ? await db()
          .selectFrom("unit_occupants")
          .innerJoin("units", "units.id", "unit_occupants.unitId")
          .select(["unit_occupants.membershipId", "units.unitNumber"])
          .where("unit_occupants.membershipId", "in", membershipIds)
          .execute()
      : [];

  const unitsByMembership = new Map<string, string[]>();
  for (const row of occupantUnits) {
    const existing = unitsByMembership.get(row.membershipId) ?? [];
    existing.push(row.unitNumber);
    unitsByMembership.set(row.membershipId, existing);
  }

  const processed = processRows(...rows);
  return processed.map((membership, i) => ({
    ...membership,
    strataName: rows[i]!.strataName,
    unitNumbers: unitsByMembership.get(membership.membershipId) ?? [],
  }));
}
