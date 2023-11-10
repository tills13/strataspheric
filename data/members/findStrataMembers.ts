import { db } from "../../db";
import { StrataMember } from "./getStrataMembers";

interface FindMembersFilters {
  email?: string;
  domain?: string;
  strataId?: string;
}

export async function findMembers(
  opts: FindMembersFilters
): Promise<StrataMember[]> {
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
      strata_memberships.unit,
      strata_memberships.role 
  FROM members 
      JOIN strata_memberships ON members.id = strata_memberships.member_id
      JOIN stratas ON strata_memberships.strata_id = stratas.id
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
    .all<StrataMember>();

  return result.results || [];
}
