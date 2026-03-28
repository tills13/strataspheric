import type { OperandExpression, SqlBool } from "kysely";

import { db } from "..";

type Filter = {
  search?: string;
};

export function listUsers(filter?: Filter) {
  return db()
    .selectFrom("users")
    .select([
      "users.id",
      "users.email",
      "users.name",
      "users.status",
      "users.accountType",
      "users.isAdmin",
    ])
    .where((eb) => {
      const stmts: OperandExpression<SqlBool>[] = [];

      if (filter?.search) {
        stmts.push(
          eb.or([
            eb("users.name", "like", `%${filter.search}%`),
            eb("users.email", "like", `%${filter.search}%`),
          ]),
        );
      }

      if (stmts.length === 0) return eb.lit(true);
      return eb.and(stmts);
    })
    .orderBy("users.name", "asc")
    .execute();
}
