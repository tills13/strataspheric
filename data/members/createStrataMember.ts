import { camelToSnakeCase, db, parameterize } from "../../db";
import { StrataMember } from "./getStrataMembers";

export async function createStrataMember(
  strataId: string,
  memberId: string,
  strataMember: Partial<StrataMember>
) {
  const fields: string[] = ["strata_id", "member_id"];
  const args: any[] = [strataId, memberId];

  for (const [key, value] of Object.entries(strataMember) as Array<
    [keyof StrataMember, string]
  >) {
    if (key === "id") {
      continue;
    }

    fields.push(camelToSnakeCase(key));
    args.push(value);
  }

  await db()
    .prepare(
      `INSERT INTO strata_memberships 
        (${fields.join(",")}) 
      VALUES 
        (${parameterize(args.length)});`
    )
    .bind(...args)
    .run();
}
