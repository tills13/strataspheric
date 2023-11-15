import { prepare } from "../../db";

export async function getMemberStratas(memberId: string) {
  const r = await prepare`
        SELECT stratas.name, stratas.domain FROM stratas
        JOIN strata_memberships ON stratas.id = strata_memberships.strata_id
        WHERE strata_memberships.member_id = ?
    `
    .bind(memberId)
    .all<{ name: string; domain: string }>();

  return r.results;
}
