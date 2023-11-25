import { db } from "..";

export function deleteUserPasswordResetToken(tokenId: string) {
  return db
    .deleteFrom("user_password_reset_tokens")
    .where("token", "=", tokenId)
    .execute();
}
