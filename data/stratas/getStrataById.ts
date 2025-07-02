import { StrataPlan, db } from "..";

export type Strata = Awaited<ReturnType<typeof getStrataById>>;

export async function getStrataById(id: string) {
  const row = await db
    .selectFrom("stratas")
    .innerJoin("strata_plans", "stratas.id", "strata_plans.strataId")
    .selectAll("stratas")
    .select([
      "strata_plans.enableAmenities",
      "strata_plans.enableDirectory",
      "strata_plans.enableEmailNotifications",
      "strata_plans.enableInbox",
      "strata_plans.enableInvoices",
      "strata_plans.enableMeetings",
      "strata_plans.id as strataPlanId",
      "strata_plans.subscriptionId",
    ])
    .where("stratas.id", "=", id)
    .executeTakeFirstOrThrow();

  const {
    enableAmenities,
    enableDirectory,
    enableEmailNotifications,
    enableInbox,
    enableInvoices,
    enableMeetings,
    subscriptionId,
    strataPlanId,
    ...rest
  } = row;

  return {
    ...rest,
    plan: {
      id: strataPlanId,
      strataId: rest.id,
      enableAmenities,
      enableDirectory,
      enableEmailNotifications,
      enableInbox,
      enableInvoices,
      enableMeetings,
      subscriptionId,
    } satisfies StrataPlan,
  };
}
