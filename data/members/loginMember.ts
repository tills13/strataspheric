import { Member } from ".";
import { db } from "../../db";

export function loginMember(
  email: string,
  password: string,
  domain: string
): Promise<Member | null> {
  if (!db()) {
    if (password === "password") {
      return Promise.resolve({
        email: "tills13@gmail.com",
        id: "018bb102-52c1-792d-b951-de3d36ba1208",
        name: "Tyler Sebastian",
        phoneNumber: "778-676-4774",
        role: "president",
        unit: "1",
      });
    }

    return Promise.resolve(null);
  }

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
            WHERE email = ? AND password = ? AND domain = ?
        `
    )
    .bind(email, password, domain)
    .first<Member>();
}
