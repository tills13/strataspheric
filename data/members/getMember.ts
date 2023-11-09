import { Member } from ".";
import { db } from "../../db";

export function getMember(email: string, domain: string) {
  return db()
    .prepare(
      `
            SELECT
                members.id,
                members.name, 
                members.email, 
                members.phone_number as phoneNumber, 
                strata_membership.role 
            FROM members 
                JOIN strata_membership ON members.id = strata_membership.member_id
                JOIN stratas ON strata_membership.strata_id = stratas.id
            WHERE email = ? AND domain = ?
        `
    )
    .bind(email, domain)
    .first<Member>();
}
