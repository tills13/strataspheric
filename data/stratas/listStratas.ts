import type { OperandExpression, SqlBool } from "kysely";

import { db } from "..";
import { Strata } from "./getStrataById";

type Filter = {
  address?: string;
  domain?: string;
  domainish?: string;
  id?: string;
  name?: string;
  nameish?: string;
  plan?: string;
  planish?: string;
};

export async function listStratas(filter: Filter): Promise<Strata[]> {
  return db
    .selectFrom("stratas")
    .leftJoin("strata_plans", "stratas.id", "strata_plans.strataId")
    .selectAll()
    .where((eb) => {
      const stmts: OperandExpression<SqlBool>[] = [];

      if (filter.id) {
        stmts.push(eb("stratas.id", "=", filter.id));
      }

      if (filter.domain) {
        stmts.push(eb("stratas.domain", "=", filter.domain));
      }

      if (filter.domainish) {
        stmts.push(eb("stratas.domain", "like", `%${filter.domainish}%`));
      }

      if (filter.plan) {
        stmts.push(eb("stratas.strataId", "=", filter.plan));
      }

      if (filter.planish) {
        stmts.push(eb("stratas.strataId", "like", `%${filter.planish}%`));
      }

      if (filter.name) {
        stmts.push(eb("stratas.name", "=", filter.name));
      }

      if (filter.nameish) {
        stmts.push(eb("stratas.name", "like", `%${filter.nameish}%`));
      }

      if (filter.address) {
        stmts.push(eb("stratas.streetAddress", "like", `%${filter.address}%`));
      }

      return eb.or(stmts);
    })
    .execute();
}
