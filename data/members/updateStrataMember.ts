import { camelToSnakeCase, db } from "../../db";
import { StrataMember } from "./getStrataMembers";

export function updateStrataMember(
  strataId: string,
  memberId: string,
  strataMember: Partial<StrataMember>
) {
  let q = "UPDATE strata_memberships SET ";

  if (Object.keys(strataMember).length === 0) {
    return;
  }

  const args: string[] = [];
  const sets: string[] = [];

  for (const [key, value] of Object.entries(strataMember) as Array<
    [keyof StrataMember, string]
  >) {
    if (key === "id") {
      continue;
    }

    sets.push(`${camelToSnakeCase(key)} = ?`);

    if (key === "isPaid") {
      args.push(value ? "TRUE" : "FALSE");
    } else {
      args.push(value);
    }
  }

  q += sets.join(", ");
  q += " WHERE member_id = ? AND strata_id = ?";

  return db()
    .prepare(q)
    .bind(...args, memberId, strataId)
    .run();
}
