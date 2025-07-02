import { db } from "..";

export type User = Awaited<ReturnType<typeof getUserByEmail>>;

export function getUserByEmail(email: string) {
  return db
    .selectFrom("users")
    .select(["users.id", "users.email", "users.status"])
    .where("users.email", "=", email)
    .executeTakeFirst();
}

export function getUserById(id: string) {
  return db
    .selectFrom("users")
    .select(["users.id", "users.email", "users.status"])
    .where("users.id", "=", id)
    .executeTakeFirst();
}
