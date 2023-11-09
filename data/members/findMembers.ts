import { Member } from ".";
import { db } from "../../db";

interface FindMembersFilters {
  email?: string;
  domain?: string;
  strataId?: string;
}

export async function findMembers(opts: FindMembersFilters): Promise<Member[]> {
  if (Object.keys(opts).length === 0) {
    throw new Error("invalid filer");
    // return [];
  }

  const args: string[] = [];

  let query = `
  SELECT
      members.id,
      members.name, 
      members.email, 
      members.phone_number as phoneNumber, 
      strata_membership.unit,
      strata_membership.role 
  FROM members 
      JOIN strata_membership ON members.id = strata_membership.member_id
      JOIN stratas ON strata_membership.strata_id = stratas.id
  WHERE TRUE`;

  if (opts.domain) {
    query += " AND domain = ?";
    args.push(opts.domain);
  }

  if (opts.email) {
    query += " AND email = ?";
    args.push(opts.email);
  }

  const result = await db()
    .prepare(query)
    .bind(...args)
    .all<Member>();

  return result.results || [];
}
