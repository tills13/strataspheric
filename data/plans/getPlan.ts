import { db } from "../../db";

export interface StrataPlan {
  id: string;
  numSeats: number;
}

export function getPlan(strataId: string) {
  return db()
    .prepare(
      "SELECT id, num_seats AS numSeats FROM strata_plans WHERE strata_id = ?"
    )
    .bind(strataId)
    .first<StrataPlan>();
}
