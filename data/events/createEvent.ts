import { uuidv7 } from "uuidv7";
import { db, prepare } from "../../db";

export async function createEvent(
  name: string,
  description: string,
  date: string
) {
  const r = await prepare`
    INSERT INTO events (id, name, description, date) 
    VALUES (?, ?, ?, ?)
    RETURNING id
  `
    .bind(uuidv7(), name, description, date)
    .first<{ id: string }>();

  return r?.id;
}
