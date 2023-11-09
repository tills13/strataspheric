"use server";

import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { revalidatePath } from "next/cache";

export async function createFile(formData: FormData) {
  const widgetId = formData.get("widget_id");
  const name = formData.get("name");
  const file = formData.get("file") as File;

  await db()
    .prepare(
      `INSERT INTO files (id, widget_id, name, path, created_at) 
      VALUES (?, ?, ?, ?, datetime())`
    )
    .bind(uuidv7(), widgetId, name, file.name)
    .run();

  revalidatePath("/dashboard");
}
