import { User, db } from "..";
import { pbkdf2Verify } from "../../utils/authentication";

export async function signInUser(
  email: string,
  password: string,
): Promise<User> {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("users.email", "=", email)
    .executeTakeFirstOrThrow();

  if (!(await pbkdf2Verify(user.password, password))) {
    throw new Error("invalid password");
  }

  return user;
}
