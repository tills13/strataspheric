import { uuidv7 } from "uuidv7";
import { db } from "../../db";

export function createWidget(strataId: string, title: string, type: string) {
  return db()
    .prepare(
      `INSERT INTO strata_widgets (id, strata_id, title, type) VALUES (?, ?, ?, ?)`
    )
    .bind(uuidv7(), strataId, title, type)
    .run();
}
