import { uuidv7 } from "uuidv7";
import { db } from "../../db";

export function createPlan(strataId: string, numSeats: number) {
  return db()
    .prepare(
      "INSERT INTO strata_plans (id, strata_id, num_seats) VALUES (?, ?, ?)"
    )
    .bind(uuidv7(), strataId, numSeats)
    .run();
}
