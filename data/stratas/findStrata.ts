import { Strata, db } from "..";

export async function findStrata(filter: {
  domain?: string;
  id?: string;
}): Promise<Strata | undefined> {
  let query = db.selectFrom("stratas").selectAll();

  if (filter.domain) {
    query = query.where("stratas.domain", "=", filter.domain);
  }

  if (filter.id) {
    query = query.where("stratas.id", "=", filter.id);
  }

  return query.executeTakeFirst();
}
