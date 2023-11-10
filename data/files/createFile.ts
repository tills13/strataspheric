import { uuidv7 } from "uuidv7";
import { db } from "../../db";

export function createFile(
  widgetId: string,
  name: string,
  description: string,
  fileName: string
) {
  return db()
    .prepare(
      `INSERT INTO files (id, widget_id, name, description, path, created_at) 
      VALUES (?, ?, ?, ?, ?, datetime())`
    )
    .bind(uuidv7(), widgetId, name, description, fileName)
    .run();
}
