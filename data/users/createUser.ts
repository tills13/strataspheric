import { uuidv7 } from "uuidv7";

import { NewUser, User, db } from "..";
import { pbkdf2 } from "../../utils/authentication";

export async function createUser({
  email,
  password,
}: Omit<NewUser, "id">): Promise<User> {
  password = await pbkdf2(password);

  return db
    .insertInto("users")
    .columns(["id", "email", "password"])
    .values({ id: uuidv7(), email, password })
    .returningAll()
    .executeTakeFirstOrThrow();
}
