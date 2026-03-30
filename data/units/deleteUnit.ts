import { db } from "..";

export async function deleteUnit(unitId: string) {
  await db()
    .deleteFrom("unit_occupants")
    .where("unit_occupants.unitId", "=", unitId)
    .execute();

  return db().deleteFrom("units").where("units.id", "=", unitId).execute();
}
