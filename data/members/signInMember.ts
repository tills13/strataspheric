import { prepare } from "../../db";
import { pbkdf2Verify } from "../../utils/authentication";
import { StrataMember } from "./getStrataMembers";

export async function signInMember(
  email: string,
  password: string,
  domain: string
): Promise<StrataMember | null> {
  const m = await prepare`
      SELECT
        members.id,
        members.email, 
        members.password AS hashedPassword,
        strata_memberships.name,
        strata_memberships.phone_number as phoneNumber, 
        strata_memberships.role,
        strata_memberships.unit 
      FROM members 
        JOIN strata_memberships ON members.id = strata_memberships.member_id
        JOIN stratas ON strata_memberships.strata_id = stratas.id
      WHERE members.email = ? AND domain = ?
    `
    .bind(email, domain)
    .first<StrataMember & { hashedPassword: string }>();

  if (!m) {
    return null;
  }

  const { hashedPassword, ...member } = m;

  if (!(await pbkdf2Verify(hashedPassword, password))) {
    throw new Error("invalid password");
  }

  return member;
}
