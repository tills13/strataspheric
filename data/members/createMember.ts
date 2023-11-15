import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { pbkdf2 } from "../../utils/authentication";

export async function createMember(email: string, password: string) {
  const result = await db()
    .prepare(
      `
      INSERT INTO members (id, email, password) 
      VALUES (?, ?, ?)
      RETURNING id
      `
    )
    .bind(uuidv7(), email, await pbkdf2(password))
    .first<{ id: string }>();

  return result?.id;
}
