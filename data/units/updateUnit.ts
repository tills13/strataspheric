import { Unit, UnitUpdate, db } from "..";

export async function updateUnit(unitId: Unit["id"], unitUpdate: UnitUpdate) {
  return db()
    .updateTable("units")
    .set(unitUpdate)
    .where("units.id", "=", unitId)
    .execute();
}
