import { prepare } from "../../db";
import { Strata } from "../stratas/getStrata";

export async function getMemberStratas(memberId: string): Promise<Strata[]> {
  const r = await prepare`
        SELECT 
          id,
          name,
          domain,
          num_units AS numUnits,
          strata_id AS strataId,
          street_address AS streetAddress,
          postal_code AS postalCode,
          province_state AS provinceState,
          is_public AS isPublic
        FROM stratas WHERE id IN (
          SELECT strata_id 
          FROM strata_memberships 
          WHERE strata_memberships.member_id = ?
        )
    `
    .bind(memberId)
    .all<Strata>();

  return r.results;
}
