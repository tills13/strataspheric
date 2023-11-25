import { UserPasswordResetToken, db } from "..";

export function getUserPasswordResetToken(
  userPasswordResetToken: Partial<UserPasswordResetToken>,
): Promise<UserPasswordResetToken | undefined> {
  if (Object.keys(userPasswordResetToken).length === 0) {
    return Promise.resolve(undefined);
  }

  let query = db.selectFrom("user_password_reset_tokens").selectAll();

  for (const [key, value] of Object.entries(userPasswordResetToken) as Array<
    [keyof UserPasswordResetToken, string]
  >) {
    query = query.where(key, "=", value);
  }

  return query.executeTakeFirst();
}
