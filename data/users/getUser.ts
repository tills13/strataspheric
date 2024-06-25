import { db } from "..";

export function getUser(email: string) {
  return db
    .selectFrom("users")
    .select(["users.id", "users.email", "users.status"])
    .where("users.email", "=", email)
    .executeTakeFirst();
}
