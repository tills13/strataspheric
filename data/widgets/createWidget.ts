"use server";

import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { revalidatePath } from "next/cache";

const staticGenerationAsyncStorage = (
  fetch as any
).__nextGetStaticStore?.() as any;

const store = staticGenerationAsyncStorage?.getStore();

console.log(fetch, staticGenerationAsyncStorage, store);

export async function createWidget(formData: FormData) {
  const strataId = formData.get("strata_id");
  const title = formData.get("title");
  const type = formData.get("type");

  if (!db()) {
    revalidatePath("/dashboard");
    return;
  }

  await db()
    .prepare(
      `INSERT INTO strata_widgets (id, strata_id, title, type) VALUES (?, ?, ?, ?)`
    )
    .bind(uuidv7(), strataId, title, type)
    .run();

  const staticGenerationAsyncStorage = (
    fetch as any
  ).__nextGetStaticStore?.() as any;

  const store = staticGenerationAsyncStorage?.getStore();

  console.log(fetch, staticGenerationAsyncStorage, store);

  revalidatePath("/dashboard", "layout");
}
