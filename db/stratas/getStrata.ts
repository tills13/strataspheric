import { Strata, db } from "..";
import { getDomain } from "../../utils/getDomain";

export function getCurrentStrata() {
  return getStrata(getDomain());
}

export async function getStrata(domain: string): Promise<Strata | undefined> {
  return db
    .selectFrom("stratas")
    .selectAll()
    .where("stratas.domain", "=", domain)
    .executeTakeFirst();
}
