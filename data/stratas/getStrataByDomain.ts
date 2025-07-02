import { notFound } from "next/navigation";
import { cache } from "react";

import { StrataPlan, db } from "..";
import { getDomain } from "../../utils/getDomain";
import { Strata } from "./getStrataById";
import { listStratas } from "./listStratas";

export async function mustGetCurrentStrata() {
  const s = await getCurrentStrata();

  if (!s) {
    notFound();
  }

  return s;
}

export async function getCurrentStrata() {
  return getStrataByDomain(await getDomain());
}

export const getStrataByDomain = cache(
  async (domain: string): Promise<Strata | undefined> => {
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
      .where("stratas.domain", "=", domain)
      .executeTakeFirst();

    if (!row) {
      return undefined;
    }

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

    const stratas = await listStratas({ domain });
    return stratas?.[0];
  },
);
