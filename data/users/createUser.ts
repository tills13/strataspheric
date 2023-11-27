import { uuidv7 } from "uuidv7";

import { NewUser, User, db } from "..";
import { pbkdf2 } from "../../utils/authentication";

export async function createUser(newUser: Omit<NewUser, "id">): Promise<User> {
  newUser.password = await pbkdf2(newUser.password);

  return db
    .insertInto("users")
    .values({ id: uuidv7(), ...newUser })
    .returningAll()
    .executeTakeFirstOrThrow();
}
