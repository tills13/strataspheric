import { db } from "..";

export async function listUnits(strataId: string) {
  const units = await db()
    .selectFrom("units")
    .selectAll()
    .where("units.strataId", "=", strataId)
    .orderBy("units.unitNumber", "asc")
    .execute();

  const unitIds = units.map((u) => u.id);

  if (unitIds.length === 0) return [];

  const occupants = await db()
    .selectFrom("unit_occupants")
    .innerJoin(
      "strata_memberships",
      "strata_memberships.id",
      "unit_occupants.membershipId",
    )
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .select([
      "unit_occupants.unitId",
      "unit_occupants.membershipId",
      "strata_memberships.userId",
      "strata_memberships.role",
      "users.name",
      "users.email",
    ])
    .where("unit_occupants.unitId", "in", unitIds)
    .execute();

  return units.map((unit) => ({
    ...unit,
    occupants: occupants.filter((o) => o.unitId === unit.id),
  }));
}

export type UnitWithOccupants = Awaited<ReturnType<typeof listUnits>>[number];
