import { db } from "..";

export async function removeUnitOccupant(
  unitId: string,
  membershipId: string,
) {
  return db()
    .deleteFrom("unit_occupants")
    .where("unit_occupants.unitId", "=", unitId)
    .where("unit_occupants.membershipId", "=", membershipId)
    .execute();
}
