import { UserUpdate, db } from "..";
import { pbkdf2 } from "../../utils/authentication";

export async function updateUser(userId: string, userUpdate: UserUpdate) {
  if (userUpdate.password) {
    userUpdate.password = await pbkdf2(userUpdate.password);
  }

  return db
    .updateTable("users")
    .set(userUpdate)
    .where("id", "=", userId)
    .execute();
}
