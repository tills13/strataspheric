import { db } from "..";

export async function countPendingMemberships(
  strataId: string,
): Promise<number> {
  const result = await db()
    .selectFrom("strata_memberships")
    .select((eb) => eb.fn<number>("count", []).as("count"))
    .where("strata_memberships.strataId", "=", strataId)
    .where("strata_memberships.role", "=", "pending")
    .executeTakeFirst();

  return result?.count ?? 0;
}
