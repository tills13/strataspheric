import { UserUpdate, db } from "..";
import { pbkdf2 } from "../../utils/authentication";

export async function updateUser(
  userId: string,
  { password }: Required<UserUpdate>,
) {
  password = await pbkdf2(password);

  return db
    .updateTable("users")
    .set({ password })
    .where("id", "=", userId)
    .execute();
}
