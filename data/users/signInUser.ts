import { StrataMembership, db } from "..";
import { pbkdf2Verify } from "../../utils/authentication";

export async function signInUser(
  email: string,
  password: string,
  domain: string,
): Promise<StrataMembership> {
  const { hashedPassword, ...membership } = await db
    .selectFrom("users")
    .innerJoin("strata_memberships", "users.id", "strata_memberships.userId")
    .innerJoin("stratas", "strata_memberships.strataId", "stratas.id")
    .selectAll("strata_memberships")
    .select("users.password as hashedPassword")
    .where("users.email", "=", email)
    .where("stratas.domain", "=", domain)
    .executeTakeFirstOrThrow();

  if (!(await pbkdf2Verify(hashedPassword, password))) {
    throw new Error("invalid password");
  }

  return membership;
}
