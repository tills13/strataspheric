import { uuidv7 } from "uuidv7";
import { db } from "../../db";
import { Strata } from "./getStrata";

export async function createStrata(
  name: string,
  domain: string,
  isPublic: boolean
) {
  const result = await db()
    .prepare(
      `
      INSERT INTO stratas (id, name, domain, is_public) 
      VALUES (?, ?, ?, ?)
      RETURNING id
      `
    )
    .bind(uuidv7(), name, domain, isPublic ? "TRUE" : "FALSE")
    .first<{ id: string }>();

  return result?.id;
}
