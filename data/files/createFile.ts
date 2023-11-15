import { uuidv7 } from "uuidv7";
import { prepare } from "../../db";

export async function createFile(
  name: string,
  description: string,
  fileName: string
) {
  const r = await prepare`
    INSERT INTO files (id, name, description, path, created_at) 
    VALUES (?, ?, ?, ?, datetime())
    RETURNING id
  `
    .bind(uuidv7(), name, description, fileName)
    .first<{ id: string }>();

  return r?.id;
}
