import { db } from "..";

export function getUser(email: string) {
  return db
    .selectFrom("users")
    .select(["users.id", "users.email"])
    .where("users.email", "=", email)
    .executeTakeFirst();
}
