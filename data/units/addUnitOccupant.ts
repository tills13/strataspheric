import { NewUnitOccupant, db } from "..";

export async function addUnitOccupant(occupant: NewUnitOccupant) {
  console.log(occupant);
  return db().insertInto("unit_occupants").values(occupant).execute();
}
