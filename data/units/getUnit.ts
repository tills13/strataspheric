import { db } from "..";

export async function getUnit(unitId: string) {
  const unit = await db()
    .selectFrom("units")
    .selectAll()
    .where("units.id", "=", unitId)
    .executeTakeFirst();

  if (!unit) return undefined;

  const occupants = await db()
    .selectFrom("unit_occupants")
    .innerJoin(
      "strata_memberships",
      "strata_memberships.id",
      "unit_occupants.membershipId",
    )
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .select([
      "unit_occupants.membershipId",
      "strata_memberships.userId",
      "strata_memberships.role",
      "users.name",
      "users.email",
    ])
    .where("unit_occupants.unitId", "=", unitId)
    .execute();

  return { ...unit, occupants };
}

export type UnitWithOccupants = NonNullable<
  Awaited<ReturnType<typeof getUnit>>
>;
