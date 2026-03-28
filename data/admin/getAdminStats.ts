import { db } from "..";

export async function getAdminStats() {
  const [strataCount, userCount, revenue] = await Promise.all([
    db()
      .selectFrom("stratas")
      .select((eb) => eb.fn.countAll<number>().as("count"))
      .executeTakeFirstOrThrow(),
    db()
      .selectFrom("users")
      .select((eb) => eb.fn.countAll<number>().as("count"))
      .executeTakeFirstOrThrow(),
    db()
      .selectFrom("strata_memberships")
      .select((eb) =>
        eb.fn.sum<number>("strata_memberships.monthlyFee").as("total"),
      )
      .executeTakeFirstOrThrow(),
  ]);

  return {
    strataCount: strataCount.count,
    userCount: userCount.count,
    monthlyRevenue: revenue.total ?? 0,
  };
}
