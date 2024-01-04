import { db } from "..";

export async function getUserIsMemberOfStrata(
  strataId: string,
  userId: string,
) {
  return !!(
    await db
      .selectFrom("strata_memberships")
      .select((eb) => eb.val(1).as("exists"))
      .where("strata_memberships.strataId", "=", strataId)
      .where("strata_memberships.userId", "=", userId)
      .executeTakeFirst()
  )?.exists;
}
