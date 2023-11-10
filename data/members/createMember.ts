import { uuidv7 } from "uuidv7";
import { db } from "../../db";

export async function createMember(email: string, password: string) {
  const result = await db()
    .prepare(
      `
      INSERT INTO members (id, email, password) 
      VALUES (?, ?, ?)
      RETURNING id
      `
    )
    .bind(uuidv7(), email, password)
    .first<{ id: string }>();

  return result?.id;
}
