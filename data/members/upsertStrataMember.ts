"use server";

import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { revalidatePath } from "next/cache";
import { findMembers } from "./findMembers";

export async function upsertStrataMember(formData: FormData) {
  const strataId = formData.get("strata_id");
  const email = formData.get("email");
  const name = formData.get("name");
  const phoneNumber = formData.get("phone_number");
  const unit = formData.get("unit");
  const role = formData.get("role");

  // const [existingUser] = await findMembers({ email });

  // if (existingUser) {
  // }

  const r = await db()
    .prepare(
      `INSERT INTO members (id, name, email, phone_number) VALUES (?, ?, ?, ?) RETURNING id;`
    )
    .bind(uuidv7(), name, email, phoneNumber)
    .first<{ id: string }>();

  const memberId = r?.id;

  if (!memberId) {
    return;
  }

  await db()
    .prepare(
      `INSERT INTO strata_membership (strata_id, member_id, role, unit) VALUES (?, ?, ?, ?);`
    )
    .bind(strataId, memberId, role, unit)
    .run();

  revalidatePath("/dashboard/membership");
}
