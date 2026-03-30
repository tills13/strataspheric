import { NewUnitOccupant, db } from "..";

export async function addUnitOccupant(occupant: NewUnitOccupant) {
  return db().insertInto("unit_occupants").values(occupant).execute();
}
