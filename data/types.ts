import { OrderByExpression } from "kysely/dist/cjs/parser/order-by-parser";

import { Database } from ".";

export type SortableColumn<M extends Record<string, unknown>> =
  keyof M extends string
    ? keyof M | `${keyof M} asc` | `${keyof M} desc`
    : never;

export type Pagination<
  QueryTableAlias extends keyof Database,
  S extends Record<string, unknown>,
> = {
  limit?: number;
  orderBy: OrderByExpression<Database, QueryTableAlias, S>;
  // | UndirectedOrderByExpression<Database, QueryTableAlias, S>
  // | DirectedOrderByStringReference<Database, QueryTableAlias, S>;
};
