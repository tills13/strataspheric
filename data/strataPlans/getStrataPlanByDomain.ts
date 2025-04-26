import { StrataPlan, db } from "..";
import { getDomain } from "../../utils/getDomain";

export async function getCurrentStrataPlan(): Promise<StrataPlan> {
  return getStrataPlanByDomain(await getDomain());
}

function getStrataPlanByDomain(domain: string) {
  return db
    .selectFrom("strata_plans")
    .selectAll()
    .where((eb) =>
      eb(
        "strata_plans.strataId",
        "=",
        eb
          .selectFrom("stratas")
          .where("stratas.domain", "=", domain)
          .select("stratas.id"),
      ),
    )
    .executeTakeFirstOrThrow();
}
