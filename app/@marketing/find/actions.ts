"use server";

import { type SelectQueryBuilder } from "kysely";

import { Database, Strata, db } from "../../../data";

interface State {
  stratas: Strata[] | undefined;
}

export async function findYourStratasActionReducer(
  currentState: State,
  fd: FormData,
) {
  const email = fd.get("email_address");
  const strataName = fd.get("strata_name");

  let membershipsQuery:
    | SelectQueryBuilder<Database, "strata_memberships", { strataId: string }>
    | undefined;

  if (typeof email === "string" && email) {
    membershipsQuery = db
      .selectFrom("strata_memberships")
      .select("strata_memberships.strataId")
      .innerJoin("users", "strata_memberships.userId", "users.id")
      .where("users.email", "=", email);
  }

  let stratasQuery:
    | SelectQueryBuilder<Database, "stratas", { strataId: string }>
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
