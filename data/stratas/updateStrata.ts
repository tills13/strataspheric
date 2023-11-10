import { camelToSnakeCase, db } from "../../db";
import { Strata } from "./getStrata";

export function updateStrata(strataId: string, strata: Partial<Strata>) {
  let q = "UPDATE stratas SET ";

  if (Object.keys(strata).length === 0) {
    return;
  }

  const args: string[] = [];
  const sets: string[] = [];

  for (const [key, value] of Object.entries(strata) as Array<
    [keyof Strata, string]
  >) {
    if (key === "id") {
      continue;
    }

    sets.push(`${camelToSnakeCase(key)} = ?`);
    args.push(value);
  }

  q += sets.join(", ");
  q += " WHERE id = ?";

  console.log(q);

  return db()
    .prepare(q)
    .bind(...args, strataId)
    .run();
}
