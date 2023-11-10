import { db } from "../../db";
import { StrataMember } from "./getStrataMembers";

export function signInMember(
  email: string,
  password: string,
  domain: string
): Promise<StrataMember | null> {
  return db()
    .prepare(
      `
            SELECT
                members.id,
                members.email, 
                strata_memberships.name,
                strata_memberships.phone_number as phoneNumber, 
                strata_memberships.role,
                strata_memberships.unit 
            FROM members 
                JOIN strata_memberships ON members.id = strata_memberships.member_id
                JOIN stratas ON strata_memberships.strata_id = stratas.id
            WHERE members.email = ? AND password = ? AND domain = ?
        `
    )
    .bind(email, password, domain)
    .first<StrataMember>();
}
