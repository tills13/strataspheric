import { db } from "..";

export async function getAdminStrata(id: string) {
  const strata = await db()
    .selectFrom("stratas")
    .selectAll("stratas")
    .where("stratas.id", "=", id)
    .executeTakeFirst();

  if (!strata) return null;

  const plan = await db()
    .selectFrom("strata_plans")
    .selectAll()
    .where("strata_plans.strataId", "=", id)
    .executeTakeFirst();

  return { ...strata, plan: plan ?? null };
}

export function listAdminStratas() {
  return db()
    .selectFrom("stratas")
    .selectAll("stratas")
    .orderBy("stratas.name", "asc")
    .execute();
}
