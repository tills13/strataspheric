import { cache } from "react";

import { db } from "..";

export type User = Awaited<ReturnType<typeof getUserByEmail>>;

export function getUserByEmail(email: string) {
  return db()
    .selectFrom("users")
    .select(["users.id", "users.email", "users.status", "users.isAdmin"])
    .where("users.email", "=", email)
    .executeTakeFirst();
}

export const getUserById = cache((id: string) => {
  return db()
    .selectFrom("users")
    .select(["users.id", "users.email", "users.status", "users.isAdmin"])
    .where("users.id", "=", id)
    .executeTakeFirst();
});

export function getFullUserById(id: string) {
  return db()
    .selectFrom("users")
    .select([
      "users.id",
      "users.email",
      "users.name",
      "users.status",
      "users.accountType",
      "users.isAdmin",
    ])
    .where("users.id", "=", id)
    .executeTakeFirst();
}
