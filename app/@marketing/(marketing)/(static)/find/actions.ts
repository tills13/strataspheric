"use server";

import { SelectQueryBuilder } from "kysely";
import { Database, Strata, db } from "../../../../../db";

interface State {
  stratas: Strata[];
}

interface SearchAction {}

export async function findYourStratasActionReducer(
  currentState: State,
  fd: FormData,
) {
  const email = fd.get("email_address");
  const strataName = fd.get("strata_name");

  let membershipsQuery:
    | SelectQueryBuilder<any, any, { strataId: string }>
    | undefined;

  if (typeof email === "string" && email) {
    membershipsQuery = db
      .selectFrom("strata_memberships")
      .select("strata_memberships.strataId")
      .where("strata_memberships.email", "=", email);
  }

  let stratasQuery:
    | SelectQueryBuilder<any, any, { strataId: string }>
    | undefined;

  if (typeof strataName === "string" && strataName) {
    stratasQuery = db
      .selectFrom("stratas")
      .select("stratas.id as strataId")
      .where((eb) =>
        eb.or([
          eb("stratas.name", "like", strataName),
          eb("stratas.domain", "=", strataName),
        ]),
      );
  }

  const stratas = await db
    .selectFrom("stratas")
    .selectAll()
    .where(
      "stratas.id",
      "in",
      membershipsQuery && stratasQuery
        ? membershipsQuery.union(stratasQuery)
        : membershipsQuery || stratasQuery,
    )
    .execute();

  return { stratas };
}