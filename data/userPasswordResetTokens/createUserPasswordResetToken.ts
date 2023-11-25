import { uuidv7 } from "uuidv7";
import { NewUserPasswordResetToken, db } from "..";

export function createUserPasswordResetToken(
  newToken: Omit<NewUserPasswordResetToken, "token">,
) {
  return db
    .insertInto("user_password_reset_tokens")
    .values({ ...newToken, token: uuidv7() })
    .returningAll()
    .executeTakeFirstOrThrow();
}
