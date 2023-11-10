import { uuidv7 } from "uuidv7";
import { db } from "../../db";

export function createEvent(
  widgetId: string,
  name: string,
  description: string,
  date: string
) {
  return db()
    .prepare(
      `INSERT INTO events (id, widget_id, name, description, date) 
      VALUES (?, ?, ?, ?, ?)`
    )
    .bind(uuidv7(), widgetId, name, description, date)
    .run();
}
