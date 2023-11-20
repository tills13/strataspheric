import { NewStrataMembership, db } from "..";

export async function createStrataMembership(
  strataMembership: NewStrataMembership,
) {
  return db.insertInto("strata_memberships").values(strataMembership).execute();
}
