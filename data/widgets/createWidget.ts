import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { type Widget } from ".";

export function createWidget(
  strataId: string,
  title: string,
  type: Widget["type"]
) {
  return db()
    .prepare(
      `INSERT INTO strata_widgets (id, strata_id, title, type) VALUES (?, ?, ?, ?)`
    )
    .bind(uuidv7(), strataId, title, type)
    .run();
}
