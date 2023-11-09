"use server";

import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  const widgetId = formData.get("widget_id");
  const name = formData.get("name");
  const description = formData.get("description");
  const date = formData.get("date");

  await db()
    .prepare(
      `INSERT INTO events (id, widget_id, name, description, date) 
      VALUES (?, ?, ?, ?, ?)`
    )
    .bind(uuidv7(), widgetId, name, description, date)
    .run();

  revalidatePath("/dashboard");
}
