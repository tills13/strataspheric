import { db } from "../../db";

export interface StrataMember {
  // member_id from members
  id: string;
  unit: string;
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  isPaid: boolean;
}

export async function getStrataMembers(
  strataId: string,
  includePending = false
): Promise<StrataMember[]> {
  let query = `
  SELECT 
      strata_memberships.member_id AS id, 
      strata_memberships.name, 
      strata_memberships.email, 
      strata_memberships.phone_number AS phoneNumber,
      strata_memberships.unit,
      strata_memberships.role
  FROM strata_memberships
  WHERE strata_id = ?
`;

  query += includePending ? "" : ' AND role != "pending"';

  query += " ORDER BY unit, name ASC";

  const result = await db().prepare(query).bind(strataId).all<StrataMember>();

  return result.results || [];
}
